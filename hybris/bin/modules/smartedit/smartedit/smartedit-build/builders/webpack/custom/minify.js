/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const set = require('../../set');
const add = require('../../add');
const group = require('../../compose');

/**
 * @ngdoc service
 * @name ConfigurationBuilder.service:webpack.minify
 * @description
 * Adds minification support to a webpack configuration.
 *
 * @param {boolean} minify A boolean for activating minification.
 * @returns {function(config)} A builder for a webpack configuration object.
 */
module.exports = (minify = true) => group(
    set('optimization.minimize', minify),
    add('optimization.minimizer', {
        apply: function(compiler) {
            const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
            return new UglifyJSPlugin({
                uglifyOptions: {
                    sourceMap: true,
                    keep_classnames: true,
                    keep_fnames: true
                },
                extractComments: true
            }).apply(compiler);
        }
    })
);
