/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('YDropDownMenuController', function() {

    // service
    var YDropDownMenuController;

    // injected
    var $q;
    var scope;

    // mocks
    var spy$templateCache;
    var spygetEncodedString;

    // data
    var mockedSelectedItem = [];
    var mockedDropdownItems = {
        callbackAndTemplate: [{
            callback: null,
            template: null
        }],
        callbackAndTemplateUrl: [{
            callback: null,
            templateUrl: null
        }],
        templateAndTemplateUrl: [{
            template: null,
            templateUrl: null
        }],
        callbackString: [{
            callback: "string"
        }],
        templateInteger: [{
            template: 0
        }],
        templateUrlInteger: [{
            templateUrl: 0
        }],
        callback: [{
            callback: function() {}
        }],
        template: [{
            template: "MOCKED_TEMPLATE"
        }],
        templateUrl: [{
            templateUrl: "MOCKED_TEMPLATE_URL"
        }]

    };
    var mockedEncodedString = "mockedEncodedString";
    var mockedEncodedTemplateUrl = "yDropdownItem_" + mockedEncodedString + "_Template.html";

    beforeEach(function() {

        angular.mock.module('yDropDownMenuModule', function($provide) {
            spy$templateCache = jasmine.createSpyObj('spy$templateCache', ['get', 'put']);
            $provide.value('$templateCache', spy$templateCache);
            spygetEncodedString = jasmine.createSpy('getEncodedString');
            $provide.value('getEncodedString', spygetEncodedString);
        });

        inject(function($rootScope, $componentController, _$q_) {
            $q = _$q_;
            scope = $rootScope.$new();
            YDropDownMenuController = $componentController(
                'yDropDownMenu', {
                    $scope: scope
                }, {
                    dropdownItems: mockedDropdownItems,
                    selectedItem: mockedSelectedItem
                }
            );
        });

    });

    describe('$onChanges', function() {

        it('throws an exception if more than one parameter is sent.', function() {

            // Given
            YDropDownMenuController.dropdownItems = mockedDropdownItems.callbackAndTemplate;

            // When
            expect(function() {
                YDropDownMenuController.$onChanges();
            }).toThrow(
                new Error("Please provide only one of callback, template or templateUrl.")
            );

            // Given
            YDropDownMenuController.dropdownItems = mockedDropdownItems.callbackAndTemplateUrl;

            // When
            expect(function() {
                YDropDownMenuController.$onChanges();
            }).toThrow(
                new Error("Please provide only one of callback, template or templateUrl.")
            );

            // Given
            YDropDownMenuController.dropdownItems = mockedDropdownItems.templateAndTemplateUrl;

            // When
            expect(function() {
                YDropDownMenuController.$onChanges();
            }).toThrow(
                new Error("Please provide only one of callback, template or templateUrl.")
            );

        });

        it('throws an exception if the sent parameter is not of the expected type.', function() {

            // Given
            YDropDownMenuController.dropdownItems = mockedDropdownItems.callbackString;

            // When
            expect(function() {
                YDropDownMenuController.$onChanges();
            }).toThrow(
                new Error("Please provide a parameter of a proper type: callback(Function), template(String) or templateUrl(String).")
            );

            // Given
            YDropDownMenuController.dropdownItems = mockedDropdownItems.templateInteger;

            // When
            expect(function() {
                YDropDownMenuController.$onChanges();
            }).toThrow(
                new Error("Please provide a parameter of a proper type: callback(Function), template(String) or templateUrl(String).")
            );

            // Given
            YDropDownMenuController.dropdownItems = mockedDropdownItems.templateUrlInteger;

            // When
            expect(function() {
                YDropDownMenuController.$onChanges();
            }).toThrow(
                new Error("Please provide a parameter of a proper type: callback(Function), template(String) or templateUrl(String).")
            );

        });

        it('sets the proper templateUrl according to the sent parameter.', function() {

            // Given
            YDropDownMenuController.dropdownItems = mockedDropdownItems.callback;

            // When
            YDropDownMenuController.$onChanges();
            scope.$digest();

            // Assert
            expect(YDropDownMenuController.clonedDropdownItems[0].templateUrl).toBe("yDropdownDefaultItemTemplate.html");

            // Given
            YDropDownMenuController.dropdownItems = mockedDropdownItems.template;
            spygetEncodedString.and.returnValue(mockedEncodedString);

            // When
            YDropDownMenuController.$onChanges();
            scope.$digest();

            // Assert
            expect(YDropDownMenuController.clonedDropdownItems[0].templateUrl).toBe(mockedEncodedTemplateUrl);

            // Given
            YDropDownMenuController.dropdownItems = mockedDropdownItems.templateUrl;

            // When
            YDropDownMenuController.$onChanges();
            scope.$digest();

            // Assert
            expect(YDropDownMenuController.clonedDropdownItems[0].templateUrl).toBe("MOCKED_TEMPLATE_URL");

        });

    });

});
