/// <reference types="angular" />
import * as lo from 'lodash';
import { CloneableUtils } from 'smarteditcommons/dtos';
import { IContextualMenuButton } from './IContextualMenuButton';
import { IDecorator } from './IDecorator';
import { InternalFeature, IFeature } from './IFeature';
import { IToolbarItem } from "./IToolbarItem";
export interface IFeaturesToAlias {
    [index: string]: {
        enablingCallback: () => void;
        disablingCallback: () => void;
    };
}
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:IFeatureService
 *
 * @description
 * The interface stipulates how to register features in the SmartEdit application and the SmartEdit container.
 * The SmartEdit implementation stores two instances of the interface across the {@link smarteditCommonsModule.service:GatewayFactory gateway}: one for the SmartEdit application and one for the SmartEdit container.
 */
export declare abstract class IFeatureService {
    private lodash;
    private cloneableUtils;
    protected _featuresToAlias: IFeaturesToAlias;
    constructor(lodash: lo.LoDashStatic, cloneableUtils: CloneableUtils);
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IFeatureService#register
     * @methodOf smarteditServicesModule.interface:IFeatureService
     * @description
     * This method registers a feature.
     * When an end user selects a perspective, all the features that are bound to the perspective
     * will be enabled when their respective enablingCallback functions are invoked
     * and all the features that are not bound to the perspective will be disabled when their respective disablingCallback functions are invoked.
     * The SmartEdit application and the SmartEdit container hold/store an instance of the implementation because callbacks cannot cross the gateway as they are functions.
     *
     * this method is meant to register a feature (identified by a key).
     * When a perspective (registered through {@link smarteditServicesModule.interface:IPerspectiveService#methods_register IPerspectiveService.register}) is selected, all its bound features will be enabled by invocation of their respective enablingCallback functions
     * and any feature not bound to it will be disabled by invocation of its disablingCallback function.
     * Both SmartEdit and SmartEditContainer will hold a concrete implementation since Callbacks, being functions, cannot cross the gateway.
     * The function will keep a frame bound reference on a full feature in order to be able to invoke its callbacks when needed.
     *
     * @param {IContextualMenuButton | IDecorator | IToolbarItem | IFeature} configuration of a {@link smarteditServicesModule.interface:IContextualMenuButton IContextualMenuButton} or
     * {@link smarteditServicesModule.interface:IDecorator IDecorator} or {@link smarteditServicesModule.interface:IToolbarItem IToolbarItem}
     *
     * @return {angular.IPromise<void>} An empty promise
     */
    register(configuration: IFeature): angular.IPromise<void>;
    enable(key: string): void;
    disable(key: string): void;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IFeatureService#getFeatureProperty
     * @methodOf smarteditServicesModule.interface:IFeatureService
     * @description
     * Returns a feature property
     *
     * @param {String} featureKey the key property value of the feature
     * @param {String} propertyName name of the property
     *
     * @return {angular.IPromise<string | string[] | (() => void)>} returns promise of property value or null if property does not exist
     */
    getFeatureProperty(featureKey: string, propertyName: keyof IFeature): angular.IPromise<string | string[] | (() => void)>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IFeatureService#addToolbarItem
     * @methodOf smarteditServicesModule.interface:IFeatureService
     *
     * @description
     * This method registers toolbar items as features. It is a wrapper around {@link smarteditServicesModule.interface:IFeatureService#methods_register register}.
     *
     * @param {IToolbarItem} configuration The {@link smarteditServicesModule.interface:IToolbarItem configuration} that represents the toolbar action item to be registered.
     *
     * @return {angular.IPromise<void>} An empty promise
     */
    addToolbarItem(toolbar: IToolbarItem): angular.IPromise<void>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IFeatureService#addDecorator
     * @methodOf smarteditServicesModule.interface:IFeatureService
     *
     * @description
     * this method registers decorator and delegates to the
     *  {@link smarteditServicesModule.service:decoratorService#methods_enable enable}
     *  {@link smarteditServicesModule.service:decoratorService#methods_disable disable} methods of
     *  {@link smarteditServicesModule.service:decoratorService decoratorService}.
     * This method is not a wrapper around {@link smarteditServicesModule.service:decoratorService#addMappings decoratorService.addMappings}:
     * From a feature stand point, we deal with decorators, not their mappings to SmartEdit components.
     * We still need to have a separate invocation of {@link smarteditServicesModule.service:decoratorService#addMappings decoratorService.addMappings}
     * @param {IDecorator} configuration The {@link smarteditServicesModule.interface:IDecorator configuration} that represents the decorator to be registered.
     * @return {angular.IPromise<void>} An empty promise
     */
    addDecorator(decorator: IDecorator): angular.IPromise<void>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IFeatureService#addContextualMenuButton
     * @methodOf smarteditServicesModule.interface:IFeatureService
     *
     * @description
     * This method registers contextual menu buttons. It is a wrapper around {@link smarteditServicesModule.ContextualMenuService#methods_addItems contextualMenuService.addItems}.
     *
     * @param {IContextualMenuButton} btn The {@link smarteditServicesModule.interface:IContextualMenuButton btn} that represents the feature to be registered.
     *
     * @return {angular.IPromise<void>} An empty promise
     */
    addContextualMenuButton(btn: IContextualMenuButton): angular.IPromise<void>;
    protected _remoteEnablingFromInner(key: string): angular.IPromise<void>;
    protected _remoteDisablingFromInner(key: string): angular.IPromise<void>;
    /**
     * This method registers a feature, identified by a unique key, across the {@link smarteditCommonsModule.service:GatewayFactory gateway}.
     * It is a simplified version of the register method, from which callbacks have been removed.
     */
    protected _registerAliases(configuration: InternalFeature): angular.IPromise<void>;
    private _validate;
}
