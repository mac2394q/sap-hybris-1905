/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const base = require('../../smartedit-build/config/karma/karma.ext.smarteditContainer.conf');
const lodash = require('lodash');

const customPaths = require('../paths');
const bundlePaths = require('../../smartedit-build/bundlePaths');

const {
    compose,
    merge,
    add
} = require('../../smartedit-build/builders');

const karma = compose(
    merge({
        junitReporter: {
            outputDir: 'jsTarget/test/smarteditContainer/junit/', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'testReport.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '' // suite will become the package name attribute in xml testsuite element
        },

        // list of files / patterns to load in the browser
        // each file acts as entry point for the webpack configuration
        files: lodash.concat(
            customPaths.getContainerThirdpartiesDevFiles(),
            bundlePaths.test.unit.commonUtilModules,
            'node_modules/ckeditor/ckeditor.js',
            'smartedit-build/test/unit/*.+(js|ts)',
            'jsTarget/templates.js',
            'jsTarget/web/app/common/**/*.js',
            'jsTarget/web/app/smarteditcontainer/**/*.js',
            'test/unit/smarteditcontainer/specBundle.ts',
            {
                pattern: 'web/webroot/static-resources/images/**/*',
                watched: false,
                included: false,
                served: true
            }

        ),

        webpack: require('../webpack/webpack.karma.smarteditContainer.config'),
    })
)(base);

module.exports = function(config) {
    config.set(karma);
};