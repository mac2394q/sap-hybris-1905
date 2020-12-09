import { WizardConfig, WizardService } from "./WizardService";
export interface IWizardActionStrategy {
    applyStrategy(wizardService: WizardService, conf: WizardConfig): void;
}
