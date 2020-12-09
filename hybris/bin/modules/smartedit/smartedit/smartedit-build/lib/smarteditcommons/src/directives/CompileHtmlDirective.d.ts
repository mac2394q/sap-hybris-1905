/// <reference types="angular" />
/**
 * @ngdoc directive
 * @name smarteditCommonsModule.directive:compileHtml
 * @scope
 * @restrict A
 * @attribute compile-html
 *
 * @description
 * Directive responsible for evaluating and compiling HTML markup.
 *
 * @param {String} String HTML string to be evaluated and compiled in the parent scope.
 * @example
 * <pre>
 *      <div compile-html="<a data-ng-click=\"injectedContext.onLink( item.path )\">{{ item[key.property] }}</a>"></div>
 * </pre>
 */
export declare class CompileHtmlDirective {
    private $compile;
    private $scope;
    private $element;
    private $attrs;
    constructor($compile: angular.ICompileService, $scope: angular.IScope, $element: JQuery<HTMLElement>, $attrs: angular.IAttributes);
    $postLink(): void;
}
