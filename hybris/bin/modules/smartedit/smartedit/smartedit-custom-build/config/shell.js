/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function () {
    return {
        targets: [
            'internalSmarteditCommons',
            'prodbuildwebappinjector',
            'devbuildwebappinjector'
        ],
        config: function (data, conf) {
            const paths = require('../paths');

            return {
                ...conf,
                prodbuildwebappinjector: {
                    command: 'webpack --mode production --config web/app/webappinjector/webpack.conf.js'
                },
                devbuildwebappinjector: {
                    command: 'webpack --mode development --devtool source-map --config web/app/webappinjector/webpack.conf.js'
                },
                internalSmarteditCommons: {
                    command: `tsc -p ${paths.tsconfig.libSmarteditCommons} --emitDeclarationOnly --stripInternal false --declarationDir ${paths.smarteditcommons.lib}`
                }
            };
        }
    };
};

