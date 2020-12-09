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
                slotShared: true
            }, {
                pageId: 'homepage',
                position: 'bottomHeader',
                slotId: 'bottomHeaderSlot',
                slotShared: false
            }, {
                pageId: 'homepage',
                position: 'footer',
                slotId: 'footerSlot',
                slotShared: true
            }, {
                pageId: 'homepage',
                position: 'other',
                slotId: 'otherSlot',
                slotShared: false
            }]
        });
    });

try {
    angular.module('smarteditloader').requires.push('mockDataOverridesModule');
} catch (e) {}
try {
    angular.module('smarteditcontainer').requires.push('mockDataOverridesModule');
} catch (e) {}
