/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const base = require('../../smartedit-build/config/karma/shared/karma.base.conf');
const lodash = require('lodash');

const customPaths = require('../paths');
const bundlePaths = require('../../smartedit-build/bundlePaths');

const {
    compose,
    merge,
    karma: {
        headless
    }
} = require('../../smartedit-build/builders');

const karma = compose(
    headless(),
    merge({
        junitReporter: {
            outputDir: 'jsTarget/test/smarteditcommons/junit/', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'testReport.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '' // suite will become the package name attribute in xml testsuite element
        },

        // list of files / patterns to load in the browser
        // each file acts as entry point for the webpack configuration
        files: lodash.concat(
            customPaths.getContainerThirdpartiesDevFiles(),
            bundlePaths.test.unit.utilsForCommonModules,
            'jsTarget/templates.js',
            'jsTarget/web/app/common/**/*.js',
            'web/app/common/specBundle.ts',
            {
                pattern: 'web/webroot/static-resources/images/**/*',
                watched: false,
                included: false,
                served: true
            }
        ),

        exclude: [
            '**/index.ts',
            '**/*.d.ts'
        ],

        webpack: require('../webpack/webpack.karma.smarteditcommons.config'),
    })
)(base);

module.exports = function(config) {
    config.set(karma);
};