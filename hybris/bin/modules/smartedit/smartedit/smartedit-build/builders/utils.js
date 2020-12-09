/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const utils = {
    keysConfigLoop(keys, config, action) {
        keys = keys.split('.');

        const root = {
            ...config || {}
        };

        const lastIndex = keys.length - 1;
        let current = root;

        keys.forEach((key, index) => {
            if (index === lastIndex) {
                action(current, utils.decodeDot(key));
            } else {
                current[key] = {
                    ...(current[key] || {})
                };
                current = current[key];
            }
        });

        return root;
    },
    encodeDot(string) {
        return string.replace(/\./g, `\\#`);
    },
    decodeDot(string) {
        return string.replace(/\\#/g, `.`);
    }
};

module.exports = utils;
