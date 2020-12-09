/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const {
    basename,
    relative,
    resolve
} = require('path');

const entry = require('./entry');

/**
 * @ngdoc service
 * @name ConfigurationBuilder.service:webpack.entry
 * @description
 * Sets multiple entries to a webpack config
 * through a provided glob pattern
 *
 * @param {object} entry The pattern
 * @returns {function(config)} A builder for a webpack configuration object.
 */
module.exports = (root, pattern) => {
    const entryMap = {
        generated_dummyE2EModule: resolve('./smartedit-build/test/e2e/dummyE2EModule.ts')
    };
    require('glob').sync(resolve(root, pattern)).forEach((file) => {
        let path = relative(root, file).replace(/\\/g, "\\\\");
        let filename = basename(path);
        path = path.replace(filename, 'generated_' + filename).replace(/\.ts$/, '');
        entryMap[path] = file;
    });
    return entry(entryMap);
};
