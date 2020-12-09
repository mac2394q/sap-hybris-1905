import { GatewayProxy } from './gateway';
export declare const GatewayProxied: (...args: string[]) => ClassDecorator;
export declare function GatewayProxiedAnnotationFactory(gatewayProxy: GatewayProxy): import("./annotationService").ClassAnnotationFactory;
