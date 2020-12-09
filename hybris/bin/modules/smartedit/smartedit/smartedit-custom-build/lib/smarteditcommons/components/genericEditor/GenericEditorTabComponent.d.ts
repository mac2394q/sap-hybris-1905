import { ISeComponent } from "smarteditcommons/di";
import { Payload } from 'smarteditcommons/dtos';
import { GenericEditorComponent } from "./GenericEditorComponent";
import { GenericEditorField } from "./types";
export declare class GenericEditorTabComponent implements ISeComponent {
    ge: GenericEditorComponent;
    id: string;
    fields: GenericEditorField[];
    tabId: string;
    component: Payload;
    $onInit(): void;
}
