/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('outer toolbarInterfaceModule', function() {

    var $rootScope, $log, $q, ToolbarServiceInterface, permissionService;

    beforeEach(angular.mock.module('toolbarInterfaceModule'));

    beforeEach(angular.mock.module('smarteditServicesModule', function($provide) {
        $provide.service('permissionService', function() {
            this._registerEventHandlers = jasmine.createSpy('_registerEventHandlers');
            this._registerEventHandlers.and.callFake(function() {});
            this.isPermitted = jasmine.createSpy('isPermitted');
        });
    }));

    beforeEach(inject(function(_$rootScope_, _ToolbarServiceInterface_, _$log_, _permissionService_, _$q_) {
        $rootScope = _$rootScope_;
        ToolbarServiceInterface = _ToolbarServiceInterface_;
        $log = _$log_;
        $q = _$q_;
        permissionService = _permissionService_;
    }));

    it('ToolbarServiceInterface declares the expected set of empty functions', function() {
        expect(ToolbarServiceInterface.prototype.addAliases).toBeEmptyFunction();
        expect(ToolbarServiceInterface.prototype.removeItemByKey).toBeEmptyFunction();
        expect(ToolbarServiceInterface.prototype.removeAliasByKey).toBeEmptyFunction();
        expect(ToolbarServiceInterface.prototype.addItemsStyling).toBeEmptyFunction();
        expect(ToolbarServiceInterface.prototype.triggerActionOnInner).toBeEmptyFunction();
    });

    it('ToolbarServiceInterface.addItems converts actions into aliases (key-callback mapping of actions) before appending them by means of addAliases', function() {

        var toolbarService = new ToolbarServiceInterface();
        toolbarService.actions = {};
        toolbarService.aliases = [];

        spyOn(toolbarService, 'addAliases').and.callThrough();
        spyOn(toolbarService, 'getAliases').and.callThrough();

        permissionService.isPermitted.and.returnValue($q.when(false));

        var callback1 = function() {};
        var callback2 = function() {};

        expect(toolbarService.getAliases()).toEqualData([]);

        // Execution
        toolbarService.addItems([{
            key: 'key1',
            nameI18nKey: 'somenameI18nKey1',
            descriptionI18nKey: 'somedescriptionI18nKey1',
            callback: callback1,
            icons: 'icons1',
            type: 'type1',
            include: 'include1'
        }]);

        toolbarService.addItems([{
            key: 'key2',
            nameI18nKey: 'somenameI18nKey2',
            descriptionI18nKey: 'somedescriptionI18nKey2',
            callback: callback2,
            icons: 'icons2',
            type: 'type2',
            include: 'include2'
        }]);

        $rootScope.$digest();

        // Tests
        expect(toolbarService.addAliases.calls.argsFor(0)[0]).toEqualData([{
            key: 'key1',
            name: 'somenameI18nKey1',
            description: 'somedescriptionI18nKey1',
            icons: 'icons1',
            type: 'type1',
            include: 'include1',
            priority: 500,
            section: 'left',
            isOpen: false,
            keepAliveOnClose: false,
            isPermissionGranted: true
        }]);


        expect(toolbarService.getItems()).toEqualData({
            'key1': callback1
        });

        expect(toolbarService.addAliases.calls.argsFor(1)[0]).toEqualData([{
            key: 'key2',
            name: 'somenameI18nKey2',
            description: 'somedescriptionI18nKey2',
            icons: 'icons2',
            type: 'type2',
            include: 'include2',
            priority: 500,
            section: 'left',
            isOpen: false,
            keepAliveOnClose: false,
            isPermissionGranted: true
        }]);


        expect(toolbarService.getItems()).toEqualData({
            'key1': callback1,
            'key2': callback2
        });
    });

    it('ToolbarServiceInterface.addItems with permissions property', function() {
        var toolbarService = new ToolbarServiceInterface();
        toolbarService.actions = {};
        toolbarService.aliases = [];

        spyOn(toolbarService, 'addAliases').and.callThrough();
        spyOn(toolbarService, 'getAliases').and.callThrough();

        permissionService.isPermitted.and.returnValue($q.when(false));

        var callback1 = function() {};

        expect(toolbarService.getAliases()).toEqualData([]);

        toolbarService.addItems([{
            key: 'key1',
            nameI18nKey: 'somenameI18nKey1',
            descriptionI18nKey: 'somedescriptionI18nKey1',
            callback: callback1,
            icons: 'icons1',
            type: 'type1',
            include: 'include1',
            permissions: ['xyz.permissions']
        }]);

        $rootScope.$digest();

        // Tests
        expect(toolbarService.addAliases.calls.argsFor(0)[0]).toEqualData([{
            key: 'key1',
            name: 'somenameI18nKey1',
            description: 'somedescriptionI18nKey1',
            icons: 'icons1',
            type: 'type1',
            include: 'include1',
            priority: 500,
            section: 'left',
            isOpen: false,
            keepAliveOnClose: false,
            isPermissionGranted: false,
            permissions: ['xyz.permissions']
        }]);
    });

    it('addItems logs an error when key is not provided in the configuration', function() {
        // Arrange
        var toolbarService = new ToolbarServiceInterface();

        spyOn($log, 'error');
        spyOn(toolbarService, 'addAliases');

        var callbacks = {
            callback1: function() {}
        };

        // Act
        toolbarService.addItems([{
            callback: callbacks.callback1
        }]);

        // Assert
        expect(toolbarService.addAliases).not.toHaveBeenCalled();
        expect($log.error).toHaveBeenCalledWith('addItems() - Cannot add action without key.');
    });

});
