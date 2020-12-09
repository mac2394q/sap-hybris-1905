/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('dummyToolbars', [])
    .run(function(featureService, perspectiveService) {

        featureService.addToolbarItem({
            toolbarId: 'smartEditPerspectiveToolbar',
            key: 'dummyToolbar',
            type: 'HYBRID_ACTION',
            nameI18nKey: 'DUMMYTOOLBAR',
            priority: 1,
            section: 'left',
            iconClassName: 'hyicon hyicon-addlg se-toolbar-menu-ddlb--button__icon',
            callback: function() {},
        });

        perspectiveService.register({
            key: 'se.cms.perspective.basic',
            nameI18nKey: 'se.cms.perspective.basic.name',
            features: ['dummyToolbar'],
            perspectives: []
        });
    });
