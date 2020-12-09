/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('operationContextPredicatesModule', ['seConstantsModule', 'yLoDashModule'])
    .service('operationContextInteractivePredicate', function(OPERATION_CONTEXT) {
        return function(response, operationContext) {
            return operationContext === OPERATION_CONTEXT.INTERACTIVE;
        };
    })
    .service('operationContextNonInteractivePredicate', function(OPERATION_CONTEXT, lodash) {
        return function(response, operationContext) {
            return lodash.includes([OPERATION_CONTEXT.BACKGROUND_TASKS, OPERATION_CONTEXT.NON_INTERACTIVE, OPERATION_CONTEXT.BATCH_OPERATIONS], operationContext);
        };
    })
    .service('operationContextCMSPredicate', function(OPERATION_CONTEXT) {
        return function(response, operationContext) {
            return operationContext === OPERATION_CONTEXT.CMS;
        };
    })
    .service('operationContextToolingPredicate', function(OPERATION_CONTEXT) {
        return function(response, operationContext) {
            return operationContext === OPERATION_CONTEXT.TOOLING;
        };
    });
