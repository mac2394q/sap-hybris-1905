/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {

    return {
        targets: [
            //only in bundle
        ],
        config: function(data, conf) {
            var paths = require('../paths');

            conf.files = paths.tsformatter;

            return conf;
        }
    };
};
