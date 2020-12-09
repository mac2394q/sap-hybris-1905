/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const {
    resolve
} = require('path');

const base = require('../../smartedit-build/config/webpack/shared/webpack.bare.config');

const {
    compose,
    webpack: {
        prod
    }
} = require('../../smartedit-build/builders');

const { vendor } = require('./webpack.shared.config');

module.exports = compose(
    prod(),
    vendor()
)(base);
