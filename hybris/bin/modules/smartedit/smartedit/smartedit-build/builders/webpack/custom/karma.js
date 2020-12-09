/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const group = require('../../compose');

const dev = require('./dev');
const coverageLoader = require('./coveragePlugin');

const addModule = require('../addModule');
const alias = require('../alias');
const devtool = require('../devtool');
const dllPlugins = require('./dllPlugins');
const karmaErrorsPlugin = require('./karmaErrorsPlugin');

const bundlePaths = require('../../../bundlePaths');

/**
 * @ngdoc service
 * @name ConfigurationBuilder.service:webpack.karma
 * @description
 * A preset group of builders for configuring a karma webpack config.
 *
 * @returns {function(config)} A builder for a webpack configuration object.
 */
module.exports = () => group(
    dev(),
    dllPlugins(),

    devtool('inline-source-map'),
    alias('testhelpers', bundlePaths.test.unit.root),
    addModule(bundlePaths.test.unit.root),

    coverageLoader(),
    karmaErrorsPlugin()
);
