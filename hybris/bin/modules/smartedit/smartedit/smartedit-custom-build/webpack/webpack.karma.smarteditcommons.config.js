/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const { resolve } = require('path');

const base = require('../../smartedit-build/config/webpack/shared/webpack.bare.config');

const {
    compose,
    webpack: {
        alias,
        devtool,
        addModule,
        karmaErrorsPlugin,
        tsLoader,
        dev,
        sassLoader,
    }
} = require('../../smartedit-build/builders');

const bundlePaths = require('../../smartedit-build/bundlePaths');
const customPaths = require('../paths');

module.exports = compose(
    dev(),
    devtool('inline-source-map'),

    alias('smarteditcommons', resolve(customPaths.smarteditcommons.sources)),
    alias('testhelpers', bundlePaths.test.unit.root),
    addModule(bundlePaths.test.unit.root),

    sassLoader(true, false),
    tsLoader(customPaths.tsconfig.karmaSmarteditcommons, true),

    karmaErrorsPlugin()
)(base);