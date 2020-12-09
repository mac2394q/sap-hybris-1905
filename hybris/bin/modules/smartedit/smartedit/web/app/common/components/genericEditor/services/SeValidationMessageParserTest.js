/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('seValidationMessageParser', function() {

    var seValidationMessageParser;

    beforeEach(angular.mock.module('genericEditorServicesModule'));

    beforeEach(inject(function(_seValidationMessageParser_) {
        seValidationMessageParser = _seValidationMessageParser_;
    }));

    describe('parse', function() {
        var MESSAGE = 'Some validation error occurred. FirstKey: [SomeValue]. SecondKey: [SomeOtherValue].';
        var parsedError;

        beforeEach(function() {
            parsedError = seValidationMessageParser.parse(MESSAGE);
        });

        it('should parse the details from the message and strip the message', function() {
            expect(parsedError.message).toBe('Some validation error occurred.');
            expect(parsedError.firstkey).toBe('SomeValue');
            expect(parsedError.secondkey).toBe('SomeOtherValue');
        });
    });
});
