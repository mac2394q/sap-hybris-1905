/// <reference types="angular-mocks" />
import * as angular from "angular";
import { IAlertService } from "smarteditcommons/services/interfaces/IAlertService";
import { TreeConfiguration, TreeDndOptionsCallbacks, TreeDragOptions } from "./types";
export declare const TreeDndOptionFactory: ($timeout: angular.ITimeoutService, treeConfig: TreeConfiguration, confirmationModalService: any, $q: angular.IQService, alertService: IAlertService) => {
    new (options?: TreeDragOptions): {
        dragEnabled: boolean;
        dragDelay: number;
        callbacks: TreeDndOptionsCallbacks;
    };
};
