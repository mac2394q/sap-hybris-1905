/// <reference types="angular-resource" />
import * as angular from 'angular';
/** @internal */
export interface IExtensibleResourceClass<T> extends angular.resource.IResourceClass<T> {
    [index: string]: angular.resource.IResourceMethod<T> | angular.resource.IResourceArrayMethod<T>;
}
