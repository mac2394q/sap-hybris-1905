import * as angular from "angular";
import { IModalService } from "../interfaces";
import { WizardAction } from "./WizardActions";
import './modalWizardNavBar.scss';
/**
 * @ngdoc service
 * @name wizardServiceModule.modalWizard
 *
 * @description
 * The modalWizard service is used to create wizards that are embedded into the {@link modalServiceModule modalService}
 */
export declare class ModalWizard {
    private modalService;
    constructor(modalService: IModalService);
    /**
     * @ngdoc method
     * @name wizardServiceModule.modalWizard#open
     * @methodOf wizardServiceModule.modalWizard
     *
     * @description
     * Open provides a simple way to create modal wizards, with much of the boilerplate taken care of for you, such as look
     * and feel, and wizard navigation.
     *
     * @param {WizardAction} conf configuration
     * @param {String|function|Array} conf.controller An angular controller which will be the underlying controller
     * for all of the wizard. This controller MUST implement the function <strong>getWizardConfig()</strong> which
     * returns a {@link wizardServiceModule.object:ModalWizardConfig ModalWizardConfig}.<br />
     * If you need to do any manual wizard manipulation, 'wizardManager' can be injected into your controller.
     * See {@link wizardServiceModule.WizardManager WizardManager}
     * @param {String} conf.controllerAs (OPTIONAL) An alternate controller name that can be used in your wizard step
     * @param {=String=} conf.properties A map of properties to initialize the wizardManager with. They are accessible under wizardManager.properties.
     * templates. By default the controller name is wizardController.
     *
     * @returns {function} {@link https://docs.angularjs.org/api/ng/service/$q promise} that will either be resolved (wizard finished) or
     * rejected (wizard cancelled).
     */
    open(config: WizardAction): angular.IPromise<any>;
    private validateConfig;
}
