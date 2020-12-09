/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('l10nModule', ['smarteditServicesModule'])
    /**
     * @ngdoc filter
     * @name l10nModule.filter:l10n
     * @description
     * Filter that accepts a localized map as input and returns the value corresponding to the resolvedLocale of {@link smarteditCommonsModule} and defaults to the first entry.
     *
     * @param {Object} localizedMap the map of language isocodes / values
     * This class serves as an interface and should be extended, not instantiated.
     *
     */
    .filter('l10n', function(languageService, crossFrameEventService, SWITCH_LANGUAGE_EVENT) {

        var l10n;

        function prepareFilter() {
            l10n = function initialFilter(str) {
                return str;
            };
            l10n.$stateful = false;

            languageService.getResolveLocaleIsoCode().then(function(resolvedLanguage) {
                l10n = function localizedFilter(localizedMap) {
                    if ('string' === typeof localizedMap) {
                        return localizedMap;
                    } else if (localizedMap) {
                        return localizedMap[resolvedLanguage] ? localizedMap[resolvedLanguage] : localizedMap[Object.keys(localizedMap)[0]];
                    }
                };
                l10n.$stateful = false;
            });
        }
        prepareFilter();

        crossFrameEventService.subscribe(SWITCH_LANGUAGE_EVENT, prepareFilter);

        return function(localizedMap) {
            return l10n(localizedMap);
        };
    });
