"use strict";
exports.__esModule = true;
/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
var fs_1 = require("fs");
var ts = require("typescript");
var lodash = require("lodash");
/**
 * @SeInjectabe TypeScript instrumenter
 * This module visit the TypeScript source code to search for DI-specific class decorators like @SeInjectable() and @SeComponent;
 * It will instrument the class to as to be usable by Smartedit DI and, more precisely, by underlying
 * AngularJS 1.6 DI
 *
 */
module.exports = function (fileNames, injectableDecorators) {
    var DECLARATIONS_REGEXP = /declarations[\s]*:[\s]*\[([^\[\]]+)\]/;
    var ENTRY_COMPONENTS_REGEXP = /entryComponents[\s]*:[\s]*\[([^\[^\]]+)\]/;
    var IGNORE_DECORATORS = ['SeModule', 'NgModule'];
    var DELEGATING_HINT = "/* @ngInject */";
    var program = ts.createProgram(fileNames, {
        target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
    });
    var checker = program.getTypeChecker(); // do not remove, it's necessary to have type check
    for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
        var sourceFile = _a[_i];
        ts.forEachChild(sourceFile, walkNode);
    }
    function walkNode(node) {
        if (!isNodeExported(node)) {
            return;
        }
        if (node.kind === ts.SyntaxKind.ClassDeclaration && ts.isClassDeclaration(node)) {
            var classDeclaration = node;
            if (classDeclaration.decorators && classDeclaration.decorators.length) {
                var classDecorators = classDeclaration.decorators
                    .filter(function (decorator) { return ts.isCallExpression(decorator.expression); })
                    .map(serializeDecorator);
                if (lodash.intersection(classDecorators.map(function (d) { return d.name; }), injectableDecorators).length) {
                    var fileName = node.getSourceFile().fileName;
                    var className = node.name.getFullText().trim();
                    var intersectDecorators = classDecorators.filter(function (c) { return injectableDecorators.indexOf(c.name) > -1; });
                    var source = getTransformedSource(node, fileName, className, intersectDecorators);
                    var stats = fs_1.statSync(fileName);
                    fs_1.writeFileSync(fileName, source);
                    fs_1.utimesSync(fileName, stats.atime, stats.mtime);
                }
            }
        }
        else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
            // This is a namespace, visit its children
            ts.forEachChild(node, walkNode);
        }
    }
    function getTemplaterUrlRegexp() {
        // return /templateUrl\s*:(\s*['"`](.*?)['"`]\s*([,}]))/gm;
        return /templateUrl:[\s\S]*(['"`]{1}[\.\/a-zA-Z0-9]+['"`]{1})/;
    }
    function getRequiredReadyTemplaterUrlRegexp() {
        // references an absolute URL
        return /templateUrl:[\s\S]*http[s]*:\/\/.+/;
    }
    function serializeDecorator(decorator) {
        var name = checker.getSymbolAtLocation(decorator.expression.getFirstToken()).getName();
        var originalArguments = decorator.expression.getFullText().replace(/^[a-zA-Z]+\(/, "").replace(/\)$/, "");
        var shouldReplaceTemplateUrl = name === "Component"
            && getTemplaterUrlRegexp().test(decorator.expression.getFullText())
            && !getRequiredReadyTemplaterUrlRegexp().test(decorator.expression.getFullText());
        return {
            name: name,
            originalArguments: originalArguments,
            arguments: shouldReplaceTemplateUrl ? originalArguments.replace(getTemplaterUrlRegexp(), "template: require($1),") : originalArguments,
            shouldReplaceTemplateUrl: shouldReplaceTemplateUrl
        };
    }
    function getTransformedSource(node, fileName, className, classDecorators) {
        var fullText = fs_1.readFileSync(fileName).toString();
        classDecorators.forEach(function (d) {
            if (d.arguments && !isDecoratorIgnored(d.name)) {
                var index = fullText.indexOf(node.getFullText());
                fullText = fullText.substr(0, index) + ("\r(window as any).__smartedit__.addDecoratorPayload('" + d.name + "', '" + className + "', " + d.arguments + ");") + fullText.substr(index);
            }
            if (d.shouldReplaceTemplateUrl) {
                // replace templateUrl by template + require
                fullText = fullText.replace(d.originalArguments, d.arguments);
            }
        });
        if (classDecorators.find(function (d) { return d.name.startsWith("Se") || d.name === 'Injectable'; })) {
            return fullText.replace(new RegExp("(export class " + className + ")", 'g'), "\rexport class " + DELEGATING_HINT + " " + className);
        }
        else {
            return fullText;
        }
    }
    function isDecoratorIgnored(decoratorName) {
        return IGNORE_DECORATORS.indexOf(decoratorName) > -1;
    }
    function isNodeExported(node) {
        return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 || (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
    }
};
