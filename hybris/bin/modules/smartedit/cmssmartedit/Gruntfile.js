/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
module.exports = (grunt) => {

    require('time-grunt')(grunt);
    require('./smartedit-build')(grunt).load();

    // -------------------------------------------------------------------------------------------------
    // FILE GENERATION
    grunt.registerTask('generate', [
        'generateTsConfig'
    ]);

    // -------------------------------------------------------------------------------------------------
    // Beautify
    // -------------------------------------------------------------------------------------------------
    grunt.registerTask('sanitize', ['jsbeautifier', 'tsformatter']);

    // -------------------------------------------------------------------------------------------------
    // Linting
    // -------------------------------------------------------------------------------------------------
    grunt.registerTask('linting', ['jshint', 'tslint']);

    // -------------------------------------------------------------------------------------------------
    // Compilation
    // -------------------------------------------------------------------------------------------------
    grunt.registerTask('compile_only', ['sanitize', 'linting', 'multipleCopySources', 'multipleNGTemplates', 'checkNoFocus', 'checkNoForbiddenNameSpaces', 'checkI18nKeysCompliancy']);
    grunt.registerTask('compile', ['clean:target', 'compile_only']);

    grunt.registerTask('concatAndPushDev', ['instrumentSeInjectable', 'webpack:devSmartedit', 'webpack:devSmarteditContainer', 'copy:dev']);

    // -------------------------------------------------------------------------------------------------
    // Unit Tests
    // -------------------------------------------------------------------------------------------------
    grunt.registerTask('multiKarma', ['karma:cmssmartedit', 'karma:cmssmarteditContainer']);
    grunt.registerTask('test_only', ['generate', 'instrumentSeInjectable', 'multiKarma']);
    grunt.registerTask('test', 'run unit tests', function() {
        let unitTaskName = 'multiKarma';
        if (grunt.option('target') === 'inner') {
            unitTaskName = 'karma:cmssmartedit';
        } else if (grunt.option('target') === 'outer') {
            unitTaskName = 'karma:cmssmarteditContainer';
        }
        if (grunt.option('browser') && !/^(inner|outer)$/.test(grunt.option('target'))) {
            grunt.fail.fatal('Please set --target=outer or --target=inner');
        }
        grunt.task.run(['generate', 'compile', 'instrumentSeInjectable', unitTaskName]);
    });
    grunt.registerTask('coverage', 'run unit tests with coverage report', () => {
        grunt.option('coverage', true);
        grunt.task.run(['generate', 'multiKarma', 'connect:coverage']);
    });

    // -------------------------------------------------------------------------------------------------
    // Dev - For development code
    // -------------------------------------------------------------------------------------------------
    grunt.registerTask('dev', ['compile', 'concatAndPushDev']);

    // -------------------------------------------------------------------------------------------------
    // Packaging - For production ready code
    // -------------------------------------------------------------------------------------------------
    grunt.registerTask('concatAndPushProd', ['instrumentSeInjectable', 'webpack:prodSmartedit', 'webpack:prodSmarteditContainer', 'copy:dev']);

    grunt.registerTask('package_only', ['concatAndPushProd', 'ngdocs']);
    grunt.registerTask('package', ['compile', 'package_only', 'test']);

    grunt.registerTask('packageSkipTests', ['generate', 'compile', 'package_only']);

    // -------------------------------------------------------------------------------------------------
    // E2E Tests
    // -------------------------------------------------------------------------------------------------
    grunt.registerTask('buildE2EScripts', [
        'clean:e2e',
        'copy:e2e',
        'instrumentSeInjectable',
        'webpack:e2eSmartedit',
        'webpack:e2eSmarteditContainer',
        'webpack:e2eScripts'
    ]);

    grunt.registerTask('generateE2eFiles', ['generateSmarteditIndexHtml:e2eSetup', 'generateStorefrontIndexHtml']);
    grunt.registerTask('setupE2e', ['generateE2eFiles', 'connect:dummystorefront', 'connect:test']);
    grunt.registerTask('e2e', ['setupE2e', 'buildE2EScripts', 'multiProtractor']); //any change to the e2e should be adapted to e2e_max task
    grunt.registerTask('e2e_max', ['setupE2e', 'buildE2EScripts', 'multiProtractorMax']);
    grunt.registerTask('e2e_dev', 'e2e local development mode', () => {
        grunt.option('keepalive_dummystorefront', true);
        grunt.option('open_browser', 'http://localhost:7000/' + global.smartedit.bundlePaths.test.e2e.listDest);
        grunt.task.run(['generateE2eListHtml', 'buildE2EScripts', 'generateE2eFiles', 'connect:test', 'connect:dummystorefront']);
    });
    grunt.registerTask('verify_only', ['e2e']);

    // Full PROD build
    grunt.registerTask('verify', ['generate', 'package', 'verify_only']); //any change to the verify tash should be adapted to verify_max task
    grunt.registerTask('verify_max', ['generate', 'package', 'e2e_max']);

    grunt.registerTask('e2e_debug', 'e2e local debug mode', () => {
        grunt.option('browser_debug', true);
        grunt.task.run('e2e');
    });

    grunt.registerTask('e2e_max_debug', 'e2e_max local debug mode', () => {
        grunt.option('browser_debug', true);
        grunt.task.run('e2e_max');
    });

    grunt.registerTask('e2e_repeat', 'Execute the e2e test(s) x amount of times', function(times) {
        let repeat = times || 1;
        grunt.task.run(['setupE2e', 'buildE2EScripts']);
        for (let i = 0; i < repeat; i++) {
            grunt.task.run('multiProtractor');
        }
    });
};
