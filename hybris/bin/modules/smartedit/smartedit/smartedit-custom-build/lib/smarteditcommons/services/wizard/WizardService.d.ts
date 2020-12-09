import * as angular from "angular";
import { TypedMap } from "smarteditcommons/dtos";
import { WizardAction } from "./WizardActions";
import { IWizardActionStrategy } from "./DefaultWizardActionStrategy";
/**
 * @ngdoc object
 * @name wizardServiceModule.object:WizardStepConfig
 * @description
 * A plain JSON object, representing the configuration options for a single step in a wizard
 */
export interface WizardStep {
    /**
     * @ngdoc property
     * @name id
     * @propertyOf wizardServiceModule.object:WizardStepConfig
     * @description
     * An optional unique ID for this step in the wizard. If no ID is provided, one is automatically generated.<br />
     * You may choose to provide an ID, making it easier to reference this step explicitly via the wizard service, or
     * be able to identify for which step a callback is being triggered.
     */
    id: string;
    /**
     * @ngdoc property
     * @name templateUrl
     * @propertyOf wizardServiceModule.object:WizardStepConfig
     * @description The url of the html template for this step
     */
    templateUrl: string;
    /**
     * @ngdoc property
     * @name title
     * @propertyOf wizardServiceModule.object:WizardStepConfig
     * @description An i18n key, representing the title that will be displayed at the top of the wizard for this step.
     */
    /**
     * @ngdoc property
     * @name name
     * @propertyOf wizardServiceModule.object:WizardStepConfig
     * @description An i18n key representing a meaning (short) name for this step.
     * This name will be displayed in the wizard navigation menu.
     */
    name: string;
    title: string;
    actions: WizardAction[];
}
/**
 * @ngdoc object
 * @name wizardServiceModule.object:ModalWizardConfig
 * @description
 * A plain JSON object, representing the configuration options for a modal wizard
 */
export interface WizardConfig {
    /**
     * @ngdoc property
     * @name steps (Array)
     * @propertyOf wizardServiceModule.object:ModalWizardConfig
     * @description An ordered array of {@link wizardServiceModule.object:WizardStepConfig WizardStepConfig}
     */
    steps: WizardStep[];
    actionStrategy: IWizardActionStrategy;
    /**
     * @ngdoc property
     * @name resultFn (Function)
     * @propertyOf wizardServiceModule.object:ModalWizardConfig
     * @description An optional callback function that has no parameters. This callback is triggered after the done
     * action is fired, and the wizard is about to be closed. If this function is defined and returns a value, this
     * value will be returned in the resolved promise returned by the {@link wizardServiceModule.modalWizard#methods_open modalWizard.open()}
     * This is an easy way to pass a result from the wizard to the caller.
     */
    resultFn: () => void;
    /**
     * @ngdoc property
     * @name isFormValid (Function)
     * @propertyOf wizardServiceModule.object:ModalWizardConfig
     * @description An optional callback function that receives a single parameter, the current step ID. This callback
     * is used to enable/disable the next action and the done action.
     * The callback should return a boolean to enabled the action. Null, or if this callback is not defined defaults to
     * true (enabled)
     */
    isFormValid?: (stepId: string) => boolean;
    /**
     * @ngdoc property
     * @name onNext (Function)
     * @propertyOf wizardServiceModule.object:ModalWizardConfig
     * @description An optional callback function that receives a single parameter, the current step ID.
     * This callback is triggered after the next action is fired. You have the opportunity to halt the Next action by
     * returning promise and rejecting it, otherwise the wizard will continue and load the next step.
     */
    onNext?: (stepId: string) => boolean;
    /**
     * @ngdoc property
     * @name onCancel (Function)
     * @propertyOf wizardServiceModule.object:ModalWizardConfig
     * @description An optional callback function that receives a single parameter, the current step ID.
     * This callback is triggered after the cancel action is fired. You have the opportunity to halt the cancel action
     * (thereby stopping the wizard from being closed), by returning a promise and rejecting it, otherwise the wizard will
     * continue the cancel action.
     */
    onCancel?: (stepId: string) => boolean;
    /**
     * @ngdoc property
     * @name onDone (Function)
     * @propertyOf wizardServiceModule.object:ModalWizardConfig
     * @description An optional callback function that has no parameters. This callback is triggered after the done
     * action is fired. You have the opportunity to halt the done action (thereby stopping the wizard from being closed),
     * by returning a promise and rejecting it, otherwise the wizard will continue and close the wizard.
     */
    onDone?: (stepId: string) => boolean;
    /**
     * @ngdoc property
     * @name doneLabel (String)
     * @propertyOf wizardServiceModule.object:ModalWizardConfig
     * @description An optional i18n key to override the default label for the Done button
     */
    doneLabel?: string;
    /**
     * @ngdoc property
     * @name nextLabel (String)
     * @propertyOf wizardServiceModule.object:ModalWizardConfig
     * @description An optional i18n key to override the default label for the Next button
     */
    nextLabel?: string;
    /**
     * @ngdoc property
     * @name backLabel (String)
     * @propertyOf wizardServiceModule.object:ModalWizardConfig
     * @description An optional i18n key to override the default label for the Back button
     */
    backLabel?: string;
    /**
     * @ngdoc property
     * @name cancelLabel (String)
     * @propertyOf wizardServiceModule.object:ModalWizardConfig
     * @description An optional i18n key to override the default label for the Cancel button
     */
    cancelLabel?: string;
    templateOverride?: string;
    cancelAction?: WizardAction;
}
/**
 * @internal
 * @ngdoc service
 * @name wizardServiceModule.WizardManager
 *
 * @description
 * The Wizard Manager is a wizard management service that can be injected into your wizard controller.
 *
 */
export declare class WizardService {
    private $q;
    private defaultWizardActionStrategy;
    private generateIdentifier;
    onLoadStep: (index: number, nextStep: WizardStep) => void;
    onClose: (result: unknown) => void;
    onCancel: () => void;
    onStepsUpdated: (steps: WizardStep[]) => void;
    properties: TypedMap<any>;
    private _actionStrategy;
    private _currentIndex;
    private _conf;
    private _steps;
    private _getResult;
    constructor($q: angular.IQService, defaultWizardActionStrategy: IWizardActionStrategy, generateIdentifier: () => string);
    initialize(conf: WizardConfig): void;
    executeAction(action: WizardAction): angular.IPromise<void>;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#goToStepWithIndex
     * @methodOf wizardServiceModule.WizardManager
     * @description Navigates the wizard to the given step
     * @param {Number} index The 0-based index from the steps array returned by the wizard controllers getWizardConfig() function
     */
    goToStepWithIndex(index: number): void;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#goToStepWithId
     * @methodOf wizardServiceModule.WizardManager
     * @description Navigates the wizard to the given step
     * @param {String} id The ID of a step returned by the wizard controllers getWizardConfig() function. Note that if
     * no id was provided for a given step, then one is automatically generated.
     */
    goToStepWithId(id: string): void;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#addStep
     * @methodOf wizardServiceModule.WizardManager
     * @description Adds an additional step to the wizard at runtime
     * @param {Object} newStep A {@link wizardServiceModule.object:WizardStepConfig WizardStepConfig}
     * @param {Number} index (OPTIONAL) A 0-based index position in the steps array. Default is 0.
     */
    addStep(newStep: WizardStep, index: number): void;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#removeStepById
     * @methodOf wizardServiceModule.WizardManager
     * @description Remove a step form the wizard at runtime. If you are removing the currently displayed step, the
     * wizard will return to the first step. Removing all the steps will result in an error.
     * @param {String} id The id of the step you wish to remove
     */
    removeStepById(id: string): void;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#removeStepByIndex
     * @methodOf wizardServiceModule.WizardManager
     * @description Remove a step form the wizard at runtime. If you are removing the currently displayed step, the
     * wizard will return to the first step. Removing all the steps will result in an error.
     * @param {Number} index The 0-based index of the step you wish to remove.
     */
    removeStepByIndex(index: number): void;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#close
     * @methodOf wizardServiceModule.WizardManager
     * @description Close the wizard. This will return a resolved promise to the creator of the wizard, and if any
     * resultFn was provided in the {@link wizardServiceModule.object:ModalWizardConfig ModalWizardConfig} the returned
     * value of this function will be passed as the result.
     */
    close(): void;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#cancel
     * @methodOf wizardServiceModule.WizardManager
     * @description Cancel the wizard. This will return a rejected promise to the creator of the wizard.
     */
    cancel(): void;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#getSteps
     * @methodOf wizardServiceModule.WizardManager
     * @returns {Array} An array of all the steps in the wizard
     */
    getSteps(): WizardStep[];
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#getStepIndexFromId
     * @methodOf wizardServiceModule.WizardManager
     * @param {String} id A step ID
     * @returns {Number} The index of the step with the provided ID
     */
    getStepIndexFromId(id: string): number;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#containsStep
     * @methodOf wizardServiceModule.WizardManager
     * @param {String} id A step ID
     * @returns {Boolean} True if the ID exists in one of the steps
     */
    containsStep(stepId: string): boolean;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#getCurrentStepId
     * @methodOf wizardServiceModule.WizardManager
     * @returns {String} The ID of the currently displayed step
     */
    getCurrentStepId(): string;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#getCurrentStepIndex
     * @methodOf wizardServiceModule.WizardManager
     * @returns {Number} The index of the currently displayed step
     */
    getCurrentStepIndex(): number;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#getCurrentStep
     * @methodOf wizardServiceModule.WizardManager
     * @returns {Object} The currently displayed step
     */
    getCurrentStep(): WizardStep;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#getStepsCount
     * @methodOf wizardServiceModule.WizardManager
     * @returns {Number} The number of steps in the wizard. This should always be equal to the size of the array
     * returned by {@link wizardServiceModule.WizardManager#methods_getSteps getSteps()}
     */
    getStepsCount(): number;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#getStepWithId
     * @methodOf wizardServiceModule.WizardManager
     * @param {String} id The ID of a step
     * @returns {Object} The {@link wizardServiceModule.object:WizardStepConfig step} with the given ID
     */
    getStepWithId(id: string): WizardStep;
    /**
     * @ngdoc method
     * @name wizardServiceModule.WizardManager#getStepWithIndex
     * @methodOf wizardServiceModule.WizardManager
     * @param {Number} index The ID of a step
     * @returns {Object} The {@link wizardServiceModule.object:WizardStepConfig step} with the given index
     */
    getStepWithIndex(index: number): WizardStep;
    private validateConfig;
    private validateStepUids;
}
