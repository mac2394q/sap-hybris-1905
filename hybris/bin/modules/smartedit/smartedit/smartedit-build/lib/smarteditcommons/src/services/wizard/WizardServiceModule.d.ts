/**
 * @ngdoc overview
 * @name wizardServiceModule
 *
 * @description
 * # The wizardServiceModule
 * The wizardServiceModule is a module containing all wizard related services
 * # Creating a modal wizard in a few simple steps
 * 1. Add the wizardServiceModule to your module dependencies
 * 2. Inject {@link wizardServiceModule.modalWizard modalWizard} where you want to use the wizard.
 * 3. Create a new controller for your wizard. This controller will be used for all steps of the wizard.
 * 4. Implement a function in your new controller called <strong>getWizardConfig</strong> that returns a {@link wizardServiceModule.object:ModalWizardConfig ModalWizardConfig}
 * 5. Use {@link wizardServiceModule.modalWizard#methods_open modalWizard.open()} passing in your new controller
 *
 * <pre>
 * @SeInjectable()
 * export class MyWizardService {
 * 		constructor(private modalWizard) {}
 * 		open() {
 * 			this.modalWizard.open({
 * 				controller: (wizardManager: any) => {
 * 					'ngInject';
 * 					return {
 * 						steps: [{
 * 							id: 'step1',
 * 							name: 'i18n.step1.name',
 * 							title: 'i18n.step1.title',
 * 							templateUrl: 'some/template1.html'
 * 						}, {
 * 							id: 'step2',
 * 							name: 'i18n.step2.name',
 * 							title: 'i18n.step2.title',
 * 							templateUrl: 'some/template2.html'
 * 						}]
 * 					};
 * 				}
 * 			});
 * 		}
 * }
 * </pre>
 */
export declare class WizardServiceModule {
}
