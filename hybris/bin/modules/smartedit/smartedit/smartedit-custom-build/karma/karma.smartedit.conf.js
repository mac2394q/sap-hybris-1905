/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const base = require('../../smartedit-build/config/karma/karma.ext.smartedit.conf');
const lodash = require('lodash');

const customPaths = require('../paths');
const bundlePaths = require('../../smartedit-build/bundlePaths');

const {
    compose,
    merge
} = require('../../smartedit-build/builders');

const karma = compose(
    merge({
        junitReporter: {
            outputDir: 'jsTarget/test/smartedit/junit/', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'testReport.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '' // suite will become the package name attribute in xml testsuite element
        },

        // list of files / patterns to load in the browser
        // each file acts as entry point for the webpack configuration
        files: lodash.concat(
            customPaths.getSmarteditThirdpartiesDevFiles(),
            'web/webroot/static-resources/thirdparties/zone.min.js',
            bundlePaths.test.unit.commonUtilModules,
            'jsTarget/templates.js',
            'jsTarget/web/app/common/**/*.js',
            'jsTarget/web/app/smartedit/directives/**/*.js',
            'jsTarget/web/app/smartedit/services/**/*.js',
            'jsTarget/web/app/smartedit/modules/**/*.js',
            'test/unit/smartedit/specBundle.ts',
            {
                pattern: 'web/webroot/static-resources/images/**/*',
                watched: false,
                included: false,
                served: true
            }
        ),

        port: 9880,

        webpack: require('../webpack/webpack.karma.smartedit.config'),
    })
)(base);

module.exports = function(config) {
    config.set(karma);
};