/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
function PageObject() {
    this.DEFAULT_ALERT_WAIT = 5000;
}

PageObject.prototype.dismissAlert = function() {
    browser.wait(EC.presenceOf(element(by.css('#confirmOk'))), this.DEFAULT_ALERT_WAIT);
    element(by.css('#confirmCancel')).click();
};

PageObject.prototype.acceptAlert = function() {
    browser.wait(EC.presenceOf(element(by.css('#confirmOk'))), this.DEFAULT_ALERT_WAIT);
    element(by.css('#confirmOk')).click();
};

module.exports = PageObject;
