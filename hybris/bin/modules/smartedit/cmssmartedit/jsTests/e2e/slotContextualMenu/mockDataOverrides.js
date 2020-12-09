/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
angular.module('mockDataOverridesModule', ['backendMocksUtilsModule'])
    .run(function(backendMocksUtils) {

        backendMocksUtils.getBackendMock('pagesContentSlotsData').respond({
            pageContentSlotList: [{
                pageId: 'homepage',
                position: 'topHeader',
                slotId: 'topHeaderSlot',
                slotShared: true,
                slotStatus: 'TEMPLATE'
            }, {
                pageId: 'homepage',
                position: 'bottomHeader',
                slotId: 'bottomHeaderSlot',
                slotShared: false,
                slotStatus: 'OVERRIDE'
            }, {
                pageId: 'homepage',
                position: 'footer',
                slotId: 'footerSlot',
                slotShared: false,
                slotStatus: 'PAGE'
            }, {
                pageId: 'homepage',
                position: 'other',
                slotId: 'otherSlot',
                slotShared: false,
                slotStatus: 'PAGE'
            }]
        });

        backendMocksUtils.getBackendMock('componentTypesPermissionsGET').respond(function() {
            var typePermissions = JSON.parse(sessionStorage.getItem('contentSlotTypePermissions'));
            var defaultContentSlotPermissions = [{
                "key": "read",
                "value": "true"
            }, {
                "key": "change",
                "value": "true"
            }, {
                "key": "create",
                "value": "true"
            }, {
                "key": "remove",
                "value": "true"
            }];

            return [200, {
                "permissionsList": [{
                    "id": "ContentSlot",
                    "permissions": typePermissions || defaultContentSlotPermissions
                }]
            }];
        });
    });

try {
    angular.module('smarteditloader').requires.push('mockDataOverridesModule');
} catch (e) {}
try {
    angular.module('smarteditcontainer').requires.push('mockDataOverridesModule');
} catch (e) {}
