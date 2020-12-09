/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('non validation error interceptor', function() {
    var alertService;
    var nonValidationErrorInterceptor;
    var genericEditorStackService;

    beforeEach(angular.mock.module('nonvalidationErrorInterceptorModule', function($provide) {
        alertService = jasmine.createSpyObj('alertService', ['showDanger']);
        genericEditorStackService = jasmine.createSpyObj('genericEditorStackService', ['isAnyGenericEditorOpened']);

        $provide.value('alertService', alertService);
        $provide.value('genericEditorStackService', genericEditorStackService);
    }));

    beforeEach(inject(function(_nonValidationErrorInterceptor_) {
        nonValidationErrorInterceptor = _nonValidationErrorInterceptor_;
    }));

    it('should match predicate for a GET xhr request with a HTTP Error 400', function() {
        // GIVEN
        var matchMockResponse = {
            status: 400
        };

        // WHEN
        var matchPredicate = nonValidationErrorInterceptor.predicate(matchMockResponse);

        // THEN
        expect(matchPredicate).toBe(true);
    });

    it('should not match predicate for a GET xhr request with a HTTP Error 401 or 404', function() {
        // GIVEN
        var predicate;
        [401, 404].forEach(function(status) {
            // WHEN
            predicate = nonValidationErrorInterceptor.predicate({
                status: status
            });

            // THEN
            expect(predicate).toBe(false);
        });
    });

    it('GIVEN no generic editor is opened AND there are validation and non-validation errors WHEN errors are intercepted THEN it should display all errors and reject the promise', function() {
        // GIVEN
        genericEditorStackService.isAnyGenericEditorOpened.and.returnValue(false);
        var mockResponse = {
            status: 400,
            data: {
                errors: [{
                    'message': 'This field cannot contain special characters',
                    'type': 'ValidationError'
                }, {
                    'message': 'This is the second validation error',
                    'type': 'NonValidationError'
                }]
            }
        };

        // WHEN
        var promise = nonValidationErrorInterceptor.responseError(mockResponse);

        // THEN
        expect(alertService.showDanger.calls.count()).toEqual(2);
        expect(alertService.showDanger).toHaveBeenCalledWith(jasmine.objectContaining({
            message: 'This field cannot contain special characters'
        }));
        expect(alertService.showDanger).toHaveBeenCalledWith(jasmine.objectContaining({
            message: 'This is the second validation error'
        }));
        expect(promise).toBeRejectedWithData(mockResponse);
    });

    it('GIVEN generic editor is opened AND there are validation and non-validation errors WHEN errors are intercepted THEN it should only display non-validation errors and reject the promise', function() {
        // GIVEN
        genericEditorStackService.isAnyGenericEditorOpened.and.returnValue(true);
        var mockResponse = {
            status: 400,
            data: {
                errors: [{
                    'message': 'This field cannot contain special characters',
                    'type': 'ValidationError'
                }, {
                    'message': 'This is the second validation error',
                    'type': 'NonValidationError'
                }]
            }
        };

        // WHEN
        var promise = nonValidationErrorInterceptor.responseError(mockResponse);

        // THEN
        expect(alertService.showDanger.calls.count()).toEqual(1);
        expect(alertService.showDanger).toHaveBeenCalledWith(jasmine.objectContaining({
            message: 'This is the second validation error'
        }));
        expect(promise).toBeRejectedWithData(mockResponse);
    });

    it('GIVEN generic editor is opened AND there are only validation errors WHEN errors are intercepted THEN it should not display any alert messages and reject the promise', function() {
        // GIVEN
        genericEditorStackService.isAnyGenericEditorOpened.and.returnValue(true);
        var mockResponse = {
            status: 400,
            data: {
                errors: [{
                    'message': 'This field cannot contain special characters',
                    'type': 'ValidationError'
                }, {
                    'message': 'This field is required',
                    'type': 'ValidationError'
                }]
            }
        };

        // WHEN
        var promise = nonValidationErrorInterceptor.responseError(mockResponse);

        // THEN
        expect(alertService.showDanger).not.toHaveBeenCalled();
        expect(promise).toBeRejectedWithData(mockResponse);
    });
});
