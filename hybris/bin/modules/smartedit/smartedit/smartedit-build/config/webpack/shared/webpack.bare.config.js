/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const {
    resolve
} = require('path');

module.exports = {
    entry: null,
    devtool: 'inline-source-map',
    output: {
        path: resolve('./jsTarget/'),
        filename: "[name].js",
        sourceMapFilename: "[file].map"
    },
    externals: {
        'angular': 'angular',
        'angular-route': 'angular-route',
        'angular-translate': 'angular-translate',
        'Reflect': 'Reflect',
        'moment': 'moment',
        'crypto-js': 'CryptoJS'
    },
    resolve: {
        modules: [
            resolve(process.cwd(), './node_modules'),
            resolve(process.cwd(), './jsTarget/web/features')
        ],
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [] // FIXME: search and replace rules[0]
    },
    performance: {
        hints: false
    },
    stats: {
        assets: false,
        colors: true,
        modules: false,
        reasons: true,
        errorDetails: true,
        warningsFilter: (warning) => {
            // workaround for:
            // https://github.com/TypeStrong/ts-loader/issues/751
            // https://github.com/angular/angular/issues/21560
            return /export '.*'( \(reexported as '.*'\))? was not found in/.test(warning) ||
                /System.import/.test(warning);
        }
    },
    plugins: [],
    bail: true,
    mode: 'development'
};
