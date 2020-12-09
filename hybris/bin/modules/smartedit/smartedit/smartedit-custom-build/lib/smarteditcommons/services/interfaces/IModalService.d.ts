/// <reference types="angular" />
export interface IModalService {
    open: (config: {
        title?: string;
        titleSuffix?: string;
        cssClasses?: string;
        buttons?: any[];
        size?: string;
        templateInline?: string;
        templateUrl?: string;
        template?: string;
        animation?: boolean;
        controller: angular.IControllerConstructor;
    }) => angular.IPromise<any>;
    close: (data?: any) => void;
    dismiss: (data?: any) => void;
}
