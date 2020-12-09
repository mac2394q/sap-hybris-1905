/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('yAnnouncementMocksModule', [
        'ngMockE2E',
        'smarteditServicesModule',
        'resourceLocationsModule'
    ])
    .constant('SMARTEDIT_ROOT', 'web/webroot')
    .constant('SMARTEDIT_RESOURCE_URI_REGEXP', /^(.*)\/test\/e2e/)
    .run(function($templateCache, $httpBackend, languageService, I18N_RESOURCE_URI) {
        $templateCache.put('sampleAnnouncement1template.html', "<div>This is an announcement coming from a template url and static data</div>");
        $templateCache.put('sampleAnnouncement2template.html', "<div>This is an announcement<br/>Data: {{$announcementCtrl.data}}</div>");

        $httpBackend.whenGET(/test\/e2e/).passThrough();
        $httpBackend.whenGET(/static-resources/).passThrough();

        var map = [{
            "value": "[\"*\"]",
            "key": "whiteListedStorefronts"
        }, {
            "value": "\"thepreviewTicketURI\"",
            "key": "previewTicketURI"
        }, {
            "value": "\"/cmswebservices/v1/i18n/languages\"",
            "key": "i18nAPIRoot"
        }];

        $httpBackend.whenGET(I18N_RESOURCE_URI + "/" + languageService.getBrowserLocale()).respond({
            'sync.confirm.msg': 'this {{catalogName}}is a test'
        });

        $httpBackend.whenGET(/configuration/).respond(
            function() {
                return [200, map];
            });
    });
try {
    angular.module('smarteditloader').requires.push('yAnnouncementMocksModule');
    angular.module('smarteditcontainer').requires.push('yAnnouncementMocksModule');
} catch (exception) {
    console.error('yAnnouncementMocks - Failed to add yAnnouncementMocksModule as a dependency', exception);
}
