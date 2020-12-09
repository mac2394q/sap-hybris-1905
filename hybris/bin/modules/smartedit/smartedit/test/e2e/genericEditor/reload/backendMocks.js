/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('backendMocksModule', ['ngMockE2E'])
    .run(function($httpBackend) {
        var DEFAULT_STRUCTURE = {
            attributes: [{
                cmsStructureType: 'ShortString',
                qualifier: 'name',
                i18nKey: 'type.anyComponentType.name.name'
            }]
        };
        var ANY_STRUCTURE = {
            attributes: [{
                cmsStructureType: 'ShortString',
                qualifier: 'headline',
                i18nKey: 'type.anyComponentType.headline.name'
            }, {
                cmsStructureType: 'Boolean',
                qualifier: 'active',
                i18nKey: 'type.anyComponentType.active.name'
            }, {
                cmsStructureType: 'LongString',
                qualifier: 'comments',
                i18nKey: 'type.anyComponentType.comments.name'
            }]
        };

        $httpBackend.whenGET(/cmswebservices\/v1\/types\/defaultComponent/).respond(function() {
            return [200, DEFAULT_STRUCTURE];
        });

        $httpBackend.whenGET(/cmswebservices\/v1\/types\/anotherComponent/).respond(function() {
            return [200, ANY_STRUCTURE];
        });

        $httpBackend.whenGET(/cmswebservices\/v1\/catalogs\/apparel-ukContentCatalog\/versions\/Staged\/items\/anyComponentId/).respond(function() {
            return [200, {
                'type': 'anyComponentData',
                'name': 'Any name',
                'pk': '1234567890',
                'typeCode': 'AnyComponent',
                'uid': 'ApparelDEAnyComponent',
                'visible': true
            }];
        });

        $httpBackend.whenPUT(/cmswebservices\/v1\/catalogs\/apparel-ukContentCatalog\/versions\/Staged\/items\/anyComponentId/).respond(function() {
            return [200, {
                'type': 'anyComponentData',
                'name': 'some new name',
                'pk': '1234567890',
                'richtext': '<strong>Any rich text here...</strong>',
                'typeCode': 'AnyComponent',
                'uid': 'ApparelDEAnyComponent',
                'visible': true
            }];
        });

        $httpBackend.whenPOST(/cmswebservices\/v1\/catalogs\/apparel-ukContentCatalog\/versions\/Staged\/items/).respond(function() {
            return [200, {
                'type': 'anyComponentData',
                'name': 'new component name',
                'pk': '1234567890',
                'typeCode': 'AnyComponent',
                'uid': 'ApparelDEAnyComponent',
                'visible': true,
                'richtext': '',
                'componentCustomField': 'custom value'
            }];
        });
    });
