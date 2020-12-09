import { GenericEditorField } from "../..";
export interface SEDropdownConfiguration {
    field: GenericEditorField;
    qualifier: string;
    model: any;
    id: string;
    onClickOtherDropdown?: (key?: string, qualifier?: string) => void;
    getApi?: ($api: {
        $api: SEDropdownAPI;
    }) => void;
}
export interface SEDropdownAPI {
    setResultsHeaderTemplateUrl(resultsHeaderTemplateUrl: string): void;
    setResultsHeaderTemplate(resultsHeaderTemplate: string): void;
}
export interface ISEDropdownService {
    qualifier: string;
    initialized: boolean;
    isMultiDropdown: boolean;
    resultsHeaderTemplateUrl: string;
    resultsHeaderTemplate: string;
    init(): void;
    onClick(): void;
    triggerAction(): void;
    reset(): void;
}
export interface ISEDropdownServiceConstructor {
    new (conf: SEDropdownConfiguration): ISEDropdownService;
}
