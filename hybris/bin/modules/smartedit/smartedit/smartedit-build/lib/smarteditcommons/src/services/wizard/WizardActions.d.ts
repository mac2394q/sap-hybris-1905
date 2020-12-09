/// <reference types="angular-mocks" />
import { WizardService } from "./WizardService";
import * as angular from "angular";
import { TypedMap } from "smarteditcommons/dtos";
export interface WizardAction {
    id?: string;
    i18n: string;
    controller?: angular.IControllerService;
    controllerAs?: string;
    isMainAction?: boolean;
    destinationIndex?: number;
    stepIndex?: number;
    wizardService?: WizardService;
    properties?: TypedMap<any>;
    isCurrentStep?(): boolean;
    enableIfCondition?(): boolean;
    executeIfCondition?(): boolean;
    execute?(wizardService: WizardService): void;
}
