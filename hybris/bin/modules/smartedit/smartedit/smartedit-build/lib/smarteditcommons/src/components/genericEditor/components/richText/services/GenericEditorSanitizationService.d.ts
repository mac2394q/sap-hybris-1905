/// <reference types="angular-sanitize" />
export declare class GenericEditorSanitizationService {
    private $sanitize;
    constructor($sanitize: angular.sanitize.ISanitizeService);
    isSanitized(content: any): boolean;
}
