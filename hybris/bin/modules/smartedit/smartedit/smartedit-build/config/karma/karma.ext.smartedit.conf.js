/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
const base = require('./shared/karma.base.conf');

const {
    compose,
    set,
    karma: {
        headless
    }
} = require('../../builders');

module.exports = compose(
    headless(),
    set('exclude', [
        'jsTarget/web/app/smartedit/smarteditModule.ts',
        'jsTarget/web/app/smartedit/partialBackendMocks.js',
        'jsTarget/web/app/smartedit/smarteditbootstrap.ts',
        '**/index.ts',
        '**/*.d.ts'
    ])
)(base);
