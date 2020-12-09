/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('test outer renderServiceInterface Module', function() {

    var yjQuery = jasmine.createSpy('yjQuery');
    var HOTKEY_NOTIFICATION_ID = 'HOTKEY_NOTIFICATION_ID';
    var HOTKEY_NOTIFICATION_TEMPLATE_URL = 'perspectiveSelectorHotkeyNotificationTemplate.html';

    var HOTKEY_NOTIFICATION_CONFIGURATION = {
        id: HOTKEY_NOTIFICATION_ID,
        templateUrl: HOTKEY_NOTIFICATION_TEMPLATE_URL
    };

    var $rootScope;
    var $document;
    var $q;
    var $window;
    var windowUtils;
    var RenderServiceInterface;
    var systemEventService;
    var notificationService;
    var perspectiveService;
    var pageInfoService;
    var crossFrameEventService;

    var triggerKeyUp = function(keyCode) {
        var e = window.smarteditJQuery.Event("keyup");
        e.which = keyCode;
        $document.trigger(e);
    };

    beforeEach(angular.mock.module('legacySmarteditCommonsModule', function($provide) {
        systemEventService = jasmine.createSpyObj('systemEventService', ['publishAsync']);
        $provide.value('systemEventService', systemEventService);

        $window = jasmine.createSpyObj('$window', ['document']);
        $provide.value('$window', $window);

        $provide.value('cachedAnnotation', jasmine.createSpy('cachedAnnotation'));
        $provide.value('invalidateCacheAnnotation', jasmine.createSpy('invalidateCacheAnnotation'));
        $provide.value('gatewayProxiedAnnotation', jasmine.createSpy('gatewayProxiedAnnotation'));

        crossFrameEventService = jasmine.createSpyObj('crossFrameEventService', ['publish']);
        $provide.value('crossFrameEventService', crossFrameEventService);

        var gatewayFactory = jasmine.createSpyObj('gatewayFactory', ['initListener']);
        $provide.value('gatewayFactory', gatewayFactory);

        var gatewayProxy = jasmine.createSpyObj('gatewayProxy', ['initForService']);
        $provide.value('gatewayProxy', gatewayProxy);
    }));

    beforeEach(angular.mock.module('smarteditServicesModule', function($provide) {
        notificationService = jasmine.createSpyObj('notificationService', ['pushNotification', 'removeNotification']);
        $provide.value('notificationService', notificationService);
    }));

    beforeEach(angular.mock.module('smarteditServicesModule', function($provide) {
        perspectiveService = jasmine.createSpyObj('perspectiveService', ['isEmptyPerspectiveActive', 'isHotkeyEnabledForActivePerspective']);
        $provide.value('perspectiveService', perspectiveService);
    }));

    beforeEach(angular.mock.module('renderServiceInterfaceModule', function($provide) {
        yjQuery.fn = {
            extend: function() {}
        };
        $provide.value('yjQuery', yjQuery);
    }));
    beforeEach(inject(function(_$rootScope_, _$document_, _$q_, _RenderServiceInterface_, _pageInfoService_, _windowUtils_) {
        $rootScope = _$rootScope_;
        $document = _$document_;
        $q = _$q_;
        windowUtils = _windowUtils_;
        RenderServiceInterface = _RenderServiceInterface_;
        pageInfoService = _pageInfoService_;
    }));

    it('RenderServiceInterface declares the expected set of empty functions', function() {

        expect(RenderServiceInterface.prototype.renderComponent).toBeEmptyFunction();
        expect(RenderServiceInterface.prototype.renderRemoval).toBeEmptyFunction();
        expect(RenderServiceInterface.prototype.toggleOverlay).toBeEmptyFunction();
        expect(RenderServiceInterface.prototype.refreshOverlayDimensions).toBeEmptyFunction();
        expect(RenderServiceInterface.prototype.blockRendering).toBeEmptyFunction();
        expect(RenderServiceInterface.prototype.isRenderingBlocked).toBeEmptyFunction();
    });

    it('RenderServiceInterface initializes successfully and binds events', function() {

        spyOn(RenderServiceInterface.prototype, '_bindEvents').and.callThrough();
        spyOn($document, 'on');

        var renderServiceInterface = new RenderServiceInterface();

        expect(renderServiceInterface).toBeDefined();
        expect($document.on.calls.count()).toBe(2);
        expect($document.on.calls.argsFor(0)).toEqual(['keyup', jasmine.any(Function)]);
        expect($document.on.calls.argsFor(1)).toEqual(['click', jasmine.any(Function)]);

    });

    it('WHEN ESC key is pressed in a non storefront view ' +
        'THEN _keyPressEvent is not triggered',
        function() {

            pageInfoService.getPageUUID.and.returnValue($q.reject({
                name: "InvalidStorefrontPageError",
            }));

            spyOn(RenderServiceInterface.prototype, '_keyPressEvent');

            var renderServiceInterface = new RenderServiceInterface();

            triggerKeyUp(27); // press ESC
            $rootScope.$digest();

            expect(renderServiceInterface).toBeDefined();
            expect(RenderServiceInterface.prototype._keyPressEvent).not.toHaveBeenCalled();

        });

    it('WHEN ESC key is pressed in storefront view with no perspective set ' +
        'THEN _keyPressEvent is not triggered',
        function() {

            pageInfoService.getPageUUID.and.returnValue($q.when("somePageUuid"));
            perspectiveService.isEmptyPerspectiveActive.and.returnValue($q.when(true));
            perspectiveService.isHotkeyEnabledForActivePerspective.and.returnValue($q.when(false));

            spyOn(RenderServiceInterface.prototype, '_keyPressEvent');

            triggerKeyUp(27); // press ESC
            $rootScope.$digest();

            expect(RenderServiceInterface.prototype._keyPressEvent).not.toHaveBeenCalled();

        });

    it('WHEN NON-ESC key is pressed ' +
        'THEN _keyPressEvent is not triggered',
        function() {

            pageInfoService.getPageUUID.and.returnValue($q.when("somePageUuid"));
            perspectiveService.isEmptyPerspectiveActive.and.returnValue($q.when(false));
            perspectiveService.isHotkeyEnabledForActivePerspective.and.returnValue($q.when(true));

            spyOn(RenderServiceInterface.prototype, '_keyPressEvent');

            var renderServiceInterface = new RenderServiceInterface();

            triggerKeyUp(17); // press other key
            $rootScope.$digest();

            expect(renderServiceInterface).toBeDefined();
            expect(RenderServiceInterface.prototype._keyPressEvent).not.toHaveBeenCalled();

        });

    it('WHEN ESC key is pressed in storefront view with some perspective set ' +
        'THEN _keyPressEvent is triggered',
        function() {

            pageInfoService.getPageUUID.and.returnValue($q.when("somePageUuid"));
            perspectiveService.isEmptyPerspectiveActive.and.returnValue($q.when(false));
            perspectiveService.isHotkeyEnabledForActivePerspective.and.returnValue($q.when(true));

            spyOn(RenderServiceInterface.prototype, '_keyPressEvent');

            var renderServiceInterface = new RenderServiceInterface();

            triggerKeyUp(27); // press ESC
            $rootScope.$digest();

            expect(renderServiceInterface).toBeDefined();
            expect(RenderServiceInterface.prototype._keyPressEvent).toHaveBeenCalled();

        });

    it('GIVEN when a modal window is open WHEN ESC key is pressed THEN nothing happens', function() {

        spyOn(RenderServiceInterface.prototype, 'isRenderingBlocked').and.returnValue($q.when(true));
        spyOn(RenderServiceInterface.prototype, '_areAllModalWindowsClosed').and.returnValue($q.when(false));
        spyOn(RenderServiceInterface.prototype, 'blockRendering');
        spyOn(RenderServiceInterface.prototype, 'renderPage');

        RenderServiceInterface.prototype._keyPressEvent();

        expect(RenderServiceInterface.prototype.blockRendering).not.toHaveBeenCalled();
        expect(RenderServiceInterface.prototype.renderPage).not.toHaveBeenCalled();
        expect(notificationService.pushNotification).not.toHaveBeenCalled();
        expect(notificationService.removeNotification).not.toHaveBeenCalled();

    });

    it('GIVEN when all modal window are closed and the rendering is already blocked ' +
        'WHEN ESC key is pressed ' +
        'THEN rendering is unblocked, renderPage is called to re-render the overlay and the hotkey notification is hidden',
        function() {

            spyOn(RenderServiceInterface.prototype, 'isRenderingBlocked').and.returnValue($q.when(true));
            spyOn(RenderServiceInterface.prototype, '_areAllModalWindowsClosed').and.returnValue($q.when(true));
            spyOn(RenderServiceInterface.prototype, 'blockRendering');
            spyOn(RenderServiceInterface.prototype, 'renderPage');

            RenderServiceInterface.prototype._keyPressEvent();
            $rootScope.$digest();

            expect(RenderServiceInterface.prototype.blockRendering).toHaveBeenCalledWith(false);
            expect(RenderServiceInterface.prototype.renderPage).toHaveBeenCalledWith(true);
            expect(notificationService.removeNotification).toHaveBeenCalledWith(HOTKEY_NOTIFICATION_ID);

        });

    it('GIVEN when all modal window are closed and the rendering is not blocked ' +
        'WHEN ESC key is pressed ' +
        'THEN rendering is blocked, renderPage is called but without re-rendering the overlay, an event is triggered and the hotkey notification is shown',
        function() {

            spyOn(RenderServiceInterface.prototype, 'isRenderingBlocked').and.returnValue($q.when(false));
            spyOn(RenderServiceInterface.prototype, '_areAllModalWindowsClosed').and.returnValue($q.when(true));
            spyOn(RenderServiceInterface.prototype, 'blockRendering');
            spyOn(RenderServiceInterface.prototype, 'renderPage');

            RenderServiceInterface.prototype._keyPressEvent();
            $rootScope.$digest();

            expect(RenderServiceInterface.prototype.blockRendering).toHaveBeenCalledWith(true);
            expect(RenderServiceInterface.prototype.renderPage).toHaveBeenCalledWith(false);
            expect(systemEventService.publishAsync).toHaveBeenCalledWith('OVERLAY_DISABLED');
            expect(notificationService.pushNotification).toHaveBeenCalledWith(HOTKEY_NOTIFICATION_CONFIGURATION);

        });

    it('GIVEN when the rendering is not blocked ' +
        'WHEN Click event is triggered ' +
        'THEN nothing happens',
        function() {

            spyOn(RenderServiceInterface.prototype, 'isRenderingBlocked').and.returnValue($q.when(false));
            spyOn(RenderServiceInterface.prototype, 'blockRendering');
            spyOn(RenderServiceInterface.prototype, 'renderPage');

            RenderServiceInterface.prototype._clickEvent();
            $rootScope.$digest();

            expect(RenderServiceInterface.prototype.blockRendering).not.toHaveBeenCalled();
            expect(RenderServiceInterface.prototype.renderPage).not.toHaveBeenCalled();
            expect(notificationService.removeNotification).not.toHaveBeenCalled();

        });

    it('GIVEN when the rendering is blocked WHEN Click event is triggered inside the frame THEN nothing happens',
        function() {

            spyOn(RenderServiceInterface.prototype, 'isRenderingBlocked').and.returnValue($q.when(true));
            spyOn(RenderServiceInterface.prototype, 'blockRendering');
            spyOn(RenderServiceInterface.prototype, 'renderPage');
            spyOn(windowUtils, 'isIframe').and.returnValue(true);

            RenderServiceInterface.prototype._clickEvent();
            $rootScope.$digest();

            expect(RenderServiceInterface.prototype.blockRendering).not.toHaveBeenCalled();
            expect(RenderServiceInterface.prototype.renderPage).not.toHaveBeenCalled();
            expect(notificationService.removeNotification).not.toHaveBeenCalledWith();
        });

    it('GIVEN when the rendering is blocked WHEN Click event is triggered outside of the frame THEN rendering is unblocked, renderPage is called to re-render the overlay and the hotkey notification is hidden',
        function() {

            spyOn(RenderServiceInterface.prototype, 'isRenderingBlocked').and.returnValue($q.when(true));
            spyOn(RenderServiceInterface.prototype, 'blockRendering');
            spyOn(RenderServiceInterface.prototype, 'renderPage');
            spyOn(windowUtils, 'isIframe').and.returnValue(false);

            RenderServiceInterface.prototype._clickEvent().then(function() {
                expect(RenderServiceInterface.prototype.blockRendering).toHaveBeenCalledWith(false);
                expect(RenderServiceInterface.prototype.renderPage).toHaveBeenCalledWith(true);
                expect(notificationService.removeNotification).toHaveBeenCalledWith(HOTKEY_NOTIFICATION_ID);
            }, function() {
                fail("RenderServiceInterface.prototype._clickEvent() should have resolved");
            });
            $rootScope.$digest();


        });

    it('GIVEN when all modal window are closed and the rendering is already blocked WHEN ESC key is pressed THEN rendering is unblocked, renderPage is called to re-render the overlay and the hotkey notification is hidden',
        function() {
            spyOn(RenderServiceInterface.prototype, 'isRenderingBlocked').and.returnValue($q.when(true));
            spyOn(RenderServiceInterface.prototype, '_areAllModalWindowsClosed').and.returnValue($q.when(true));
            spyOn(RenderServiceInterface.prototype, 'blockRendering');
            spyOn(RenderServiceInterface.prototype, 'renderPage');

            RenderServiceInterface.prototype._keyPressEvent();
            $rootScope.$digest();

            expect(RenderServiceInterface.prototype.blockRendering).toHaveBeenCalledWith(false);
            expect(RenderServiceInterface.prototype.renderPage).toHaveBeenCalledWith(true);
            expect(notificationService.removeNotification).toHaveBeenCalledWith(HOTKEY_NOTIFICATION_ID);

        });

    it('GIVEN when all modal window are closed and the rendering is not blocked ' +
        'WHEN ESC key is pressed ' +
        'THEN rendering is blocked, renderPage is called but without re-rendering the overlay, an event is triggered and the hotkey notification is shown',
        function() {

            spyOn(RenderServiceInterface.prototype, 'isRenderingBlocked').and.returnValue($q.when(false));
            spyOn(RenderServiceInterface.prototype, '_areAllModalWindowsClosed').and.returnValue($q.when(true));
            spyOn(RenderServiceInterface.prototype, 'blockRendering');
            spyOn(RenderServiceInterface.prototype, 'renderPage');

            RenderServiceInterface.prototype._keyPressEvent();
            $rootScope.$digest();

            expect(RenderServiceInterface.prototype.blockRendering).toHaveBeenCalledWith(true);
            expect(RenderServiceInterface.prototype.renderPage).toHaveBeenCalledWith(false);
            expect(systemEventService.publishAsync).toHaveBeenCalledWith('OVERLAY_DISABLED');
            expect(notificationService.pushNotification).toHaveBeenCalledWith(HOTKEY_NOTIFICATION_CONFIGURATION);

        });

    it('GIVEN when the rendering is not blocked ' +
        'WHEN Click event is triggered ' +
        'THEN nothing happens',
        function() {

            spyOn(RenderServiceInterface.prototype, 'isRenderingBlocked').and.returnValue($q.when(false));
            spyOn(RenderServiceInterface.prototype, 'blockRendering');
            spyOn(RenderServiceInterface.prototype, 'renderPage');

            RenderServiceInterface.prototype._clickEvent();
            $rootScope.$digest();

            expect(RenderServiceInterface.prototype.blockRendering).not.toHaveBeenCalled();
            expect(RenderServiceInterface.prototype.renderPage).not.toHaveBeenCalled();
            expect(notificationService.removeNotification).not.toHaveBeenCalled();

        });

    it('GIVEN when the rendering is blocked ' +
        'WHEN Click event is triggered inside the frame' +
        'THEN nothing happens',
        function() {

            spyOn(RenderServiceInterface.prototype, 'isRenderingBlocked').and.returnValue($q.when(true));
            spyOn(RenderServiceInterface.prototype, 'blockRendering');
            spyOn(RenderServiceInterface.prototype, 'renderPage');
            spyOn(windowUtils, 'isIframe').and.returnValue(true);

            RenderServiceInterface.prototype._clickEvent();
            $rootScope.$digest();

            expect(RenderServiceInterface.prototype.blockRendering).not.toHaveBeenCalled();
            expect(RenderServiceInterface.prototype.renderPage).not.toHaveBeenCalled();
            expect(notificationService.removeNotification).not.toHaveBeenCalled();

        });

    it('GIVEN when the rendering is blocked ' +
        'WHEN Click event is triggered outside of the frame' +
        'THEN rendering is unblocked, renderPage is called to re-render the overlay and the hotkey notification is hidden',
        function() {

            spyOn(RenderServiceInterface.prototype, 'isRenderingBlocked').and.returnValue($q.when(true));
            spyOn(RenderServiceInterface.prototype, 'blockRendering');
            spyOn(RenderServiceInterface.prototype, 'renderPage');

            spyOn(windowUtils, 'isIframe').and.returnValue(false);

            RenderServiceInterface.prototype._clickEvent();
            $rootScope.$digest();

            expect(RenderServiceInterface.prototype.blockRendering).toHaveBeenCalledWith(false);
            expect(RenderServiceInterface.prototype.renderPage).toHaveBeenCalledWith(true);
            expect(notificationService.removeNotification).toHaveBeenCalledWith(HOTKEY_NOTIFICATION_ID);

        });

    it('WHEN Click event is triggered outside of the frame' +
        'THEN a cross frame event is published',
        function() {

            spyOn(RenderServiceInterface.prototype, 'isRenderingBlocked').and.returnValue($q.when(true));
            spyOn(RenderServiceInterface.prototype, 'blockRendering');
            spyOn(RenderServiceInterface.prototype, 'renderPage');
            spyOn(windowUtils, 'isIframe').and.returnValue(false);

            RenderServiceInterface.prototype._clickEvent();
            $rootScope.$digest();

            expect(crossFrameEventService.publish).toHaveBeenCalled();

        });

});
