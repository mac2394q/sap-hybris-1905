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
