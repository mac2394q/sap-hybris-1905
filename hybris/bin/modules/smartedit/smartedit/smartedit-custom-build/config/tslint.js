/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {

    return {
        targets: [
            'files'
        ],
        config: function(data, conf) {
            var paths = require('../paths');

            conf.files = paths.tslint;

            return conf;
        }
    };

};
