/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('pagesContentSlotsContainerMocks', ['ngMockE2E']);

angular.module('pagesContentSlotsContainerMocks')
    .run(function($httpBackend) {

        /**
         * Mocks the /pagescontentslots resource with the query parameter 'pageId' set to 'homepage' to return four associations, indicating that the page has four slots.
         */
        $httpBackend.whenGET(/cmswebservices\/v1\/sites\/.*\/catalogs\/.*\/versions\/Staged\/pagescontentslotscontainers\?pageId=.*/).respond({
            pageContentSlotContainerList: []
        });

    });
try {
    angular.module('smarteditloader').requires.push('pagesContentSlotsContainerMocks');
} catch (e) {}
try {
    angular.module('smarteditcontainer').requires.push('pagesContentSlotsContainerMocks');
} catch (e) {}
