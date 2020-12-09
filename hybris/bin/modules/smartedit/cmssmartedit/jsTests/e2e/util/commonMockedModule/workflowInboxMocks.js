/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('workflowInboxMocks', ['ngMockE2E'])
    .run(
        function($httpBackend, backendMocksUtils) {
            var workflowInboxTasksGETMock = $httpBackend.whenGET(/\/cmssmarteditwebservices\/v1\/inbox\/workflowtasks\?currentPage=.*&pageSize=.*/).respond(function() {
                return [200, {
                    pagination: {
                        count: 0,
                        page: 0,
                        totalCount: 0,
                        totalPages: 0
                    },
                    tasks: []
                }];
            });
            backendMocksUtils.storeBackendMock('workflowInboxTasksGETMock', workflowInboxTasksGETMock);
        });
try {
    angular.module('smarteditloader').requires.push('workflowInboxMocks');
} catch (e) {}
try {
    angular.module('smarteditcontainer').requires.push('workflowInboxMocks');
} catch (e) {}
