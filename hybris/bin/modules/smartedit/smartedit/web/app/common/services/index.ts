/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
// forced import to make sure d.ts are generated for the interfaces below
export * from './annotationService';
export * from './cache';
export * from './gateway';
export * from './interfaces';
export * from './wizard';
export * from './ConfigModule';
export {TextTruncateService} from './text/textTruncateService';
export {AuthorizationService} from './AuthorizationService';
export {CrossFrameEventService} from './crossFrame/CrossFrameEventService';
export {CrossFrameEventServiceGateway} from './crossFrame/CrossFrameEventServiceGateway';
export {GatewayProxied, GatewayProxiedAnnotationFactory} from './gatewayProxiedAnnotation';
export {instrument} from './instrumentation';
export {ILanguage, IToolingLanguage, LanguageService} from './language/LanguageService';
export {LanguageServiceGateway} from './language/LanguageServiceGateway';
export {IPerspective} from './perspectives/IPerspective';
export {IPerspectiveService} from './perspectives/IPerspectiveService';
export * from './rest/rest';
export {OperationContextService} from './httpErrorInterceptor/default/retryInterceptor/OperationContextService';
export {OperationContextAnnotationFactory, OperationContextRegistered} from './httpErrorInterceptor/default/retryInterceptor/operationContextAnnotation';
export {PolyfillService} from './PolyfillService';
export {PriorityService} from './PriorityService';
export {SmarteditBootstrapGateway} from './SmarteditBootstrapGateway';
export {EventHandler, SystemEventService} from './SystemEventService';
export {TestModeService} from './TestModeService';
export * from './browser';
export * from './SeRouteModule';
export * from './SeRouteService';
export * from './dragAndDrop';
export * from './storage';
export * from './LogService';