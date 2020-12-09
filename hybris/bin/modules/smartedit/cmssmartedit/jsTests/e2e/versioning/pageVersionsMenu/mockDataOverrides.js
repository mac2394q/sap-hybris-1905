/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('mockDataOverridesModule', ['backendMocksUtilsModule'])
    .run(function(backendMocksUtils) {

        var emptyVersionList = JSON.parse(sessionStorage.getItem("emptyVersionList"));
        if (emptyVersionList) {
            backendMocksUtils.getBackendMock('pageVersionsGETMock').respond(function() {
                var pagedResults = {
                    pagination: {
                        count: 0,
                        page: 0,
                        totalCount: 0,
                        totalPages: 0
                    },
                    results: []
                };

                return [200, pagedResults];
            });
        }
    });

try {
    angular.module('smarteditloader').requires.push('mockDataOverridesModule');
} catch (e) {}
try {
    angular.module('smarteditcontainer').requires.push('mockDataOverridesModule');
} catch (e) {}
