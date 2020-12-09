/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const base = require('../../smartedit-build/config/webpack/webpack.ext.karma.smartedit.config');

const {
    compose,
    unset
} = require('../../smartedit-build/builders');

const { smartedit } = require('./webpack.shared.config');

module.exports = compose(
    smartedit(),
    unset('entry')
)(base);