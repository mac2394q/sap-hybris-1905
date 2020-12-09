/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
describe('seMediaService', function() {

    var seMediaService;
    var $q, $rootScope, $resource, restMock;

    beforeEach(angular.mock.module('seMediaServiceModule', function($provide) {
        restMock = jasmine.createSpyObj('restMock', ['save']);
        $resource = jasmine.createSpy('$resource');
        $resource.and.returnValue(restMock);
        $provide.value('$resource', $resource);
    }));

    beforeEach(inject(function(_seMediaService_, _$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        seMediaService = _seMediaService_;
    }));

    describe('uploadMedia', function() {
        var IMAGE_MOCK = {
            file: {
                name: 'filename'
            }
        };
        var save = {
            some: 'result'
        };
        var result;

        beforeEach(function() {
            restMock.save.and.returnValue({
                $promise: $q.when(save)
            });
            result = seMediaService.uploadMedia(IMAGE_MOCK);
            $rootScope.$digest();
        });

        it('should call the save method of the seMediaResource resource', function() {
            expect(restMock.save).toHaveBeenCalledWith(IMAGE_MOCK);
        });

        it('should return a promise', function() {
            expect(result).toBeResolvedWithData(save);
        });
    });

});
