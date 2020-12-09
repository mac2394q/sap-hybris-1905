/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('BackendMockModule', ['ngMockE2E', 'resourceLocationsModule', 'smarteditServicesModule'])
    .constant('e2eMode', true)
    .run(function($httpBackend, languageService, I18N_RESOURCE_URI) {

        $httpBackend.whenGET(/ctxTemplate.html/).respond('<div id="ctx-template-url">Some template file</div>');

        $httpBackend.whenGET(I18N_RESOURCE_URI + "/" + languageService.getBrowserLocale()).respond(function() {
            var map = {
                'type.componenttype1.content.name': 'Content',
                'type.componenttype1.name.name': 'Name',
                'type.componenttype1.mediaContainer.name': 'Media Container',
                'se.componentform.actions.exit': 'Exit',
                'se.componentform.actions.cancel': 'Cancel',
                'se.componentform.actions.submit': 'Submit',
                'abanalytics.popover.title': 'ab analytics',
                'type.componenttype1.content.tooltip': 'enter content',
                'se.unknown.request.error': 'Your request could not be processed! Please try again later!'
            };
            return [200, map];
        });

    });
