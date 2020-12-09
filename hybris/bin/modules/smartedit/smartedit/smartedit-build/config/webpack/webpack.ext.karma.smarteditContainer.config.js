/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const {
    resolve
} = require('path');
const base = require('./shared/webpack.bare.config');

const {
    compose,
    webpack: {
        tsLoader,
        karma,
        sassLoader
    }
} = require('../../builders');

const bundlePaths = require('../../bundlePaths');

module.exports = compose(
    karma(),
    sassLoader(),
    tsLoader(resolve(bundlePaths.external.generated.tsconfig.karmaSmarteditContainer), true, true)
)(base);
