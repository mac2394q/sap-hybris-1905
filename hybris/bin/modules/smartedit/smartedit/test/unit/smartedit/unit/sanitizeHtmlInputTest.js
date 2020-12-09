/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('directive:sanitizeHtmlInput', function() {

    var $compile, $rootScope;
    var element, elementScope;

    beforeEach(angular.mock.module('sanitizeHtmlInputModule'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function() {
        elementScope = $rootScope.$new();
        var originalElement = angular.element('<input sanitize-html-input></input>');
        element = $compile(originalElement)(elementScope);
        elementScope.$digest();
    });

    it('WILL sanitize inputs containing curly brackets', function() {
        element.val('{{555-444}}');
        var originalValue = element.val();
        element.trigger('change');
        var sanitizedValue = element.val();

        expect(originalValue).toBe('{{555-444}}');
        expect(sanitizedValue).toBe('%7B%7B555-444%7D%7D');
    });

});
