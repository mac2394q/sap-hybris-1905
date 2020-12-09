import { WizardConfig, WizardService } from "./WizardService";
import { WizardActions } from "./WizardActions";
export interface IWizardActionStrategy {
    applyStrategy(wizardService: WizardService, conf: WizardConfig): void;
}
export declare class DefaultWizardActionStrategy implements IWizardActionStrategy {
    private wizardActions;
    constructor(wizardActions: WizardActions);
    applyStrategy(wizardService: WizardService, conf: WizardConfig): void;
    private applyOverrides;
}
