/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const {
    resolve
} = require('path');

const base = require('../../smartedit-build/config/webpack/shared/webpack.bare.config');

const {
    compose,
    set,
    webpack: {
        contextReplacementPlugin,
        entry,
        output,
        tsLoader,
        dev
    }
} = require('../../smartedit-build/builders');

const bundlePaths = require('../../smartedit-build/bundlePaths');
const customPaths = require('../paths');

module.exports = compose(
    entry({
        angularStorefront: resolve(customPaths.entrypoints.angularStorefront)
    }),
    output({
        "path": resolve(customPaths.copyToDummystorefront),
        "filename": "[name].js"
    }),
    dev(),

    tsLoader(resolve(bundlePaths.external.generated.tsconfig.angularStorefront), false),

    contextReplacementPlugin(
        /angular(\\|\/)core/, // The (\\|\/) piece accounts for path separators in *nix and Windows
        require('path').resolve(__dirname, '../web/app'), {}
    ),

    set('optimization', {
        // If optimization.runtimeChunk is set to true, multiple runtime chunks are created if there is more than one entrypoint. To avoid this, optimization.runtimeChunk has to be set to 'single' instead.
        runtimeChunk: 'single', //using "single" only when using multiple entrypoints in one HTML page. https://github.com/webpack/webpack/issues/2134
        splitChunks: {
            cacheGroups: {
                storefrontvendor: {
                    name: 'storefrontvendor',
                    test: /\/node_modules\/(@angular|core-js|rxjs|zone.js)\//,
                    chunks: 'all',
                    priority: 0,
                    enforce: true,
                },
            },
        }
    })
)(base);