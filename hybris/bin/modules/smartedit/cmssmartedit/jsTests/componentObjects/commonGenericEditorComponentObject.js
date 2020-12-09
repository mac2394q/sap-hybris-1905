/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var componentObject = {};

    componentObject.constants = {};

    componentObject.elements = {
        getOpenedEditorModals: function() {
            return element.all(by.xpath('//div[@uib-modal-window="modal-window"][.//generic-editor]'));
        },
        getTopEditorModal: function() {
            return this.getOpenedEditorModals().get(0);

        },
        getFieldByQualifier: function(fieldQualifier) {

            var modalElement = this.getTopEditorModal();
            browser.waitForPresence(modalElement);

            var field = modalElement.element(by.css(".ySEGenericEditorFieldStructure[data-cms-field-qualifier='" + fieldQualifier + "']"));
            browser.waitForPresence(field);

            return field;
        }
    };

    componentObject.actions = {};

    componentObject.assertions = {};

    componentObject.utils = {};

    return componentObject;

}());
