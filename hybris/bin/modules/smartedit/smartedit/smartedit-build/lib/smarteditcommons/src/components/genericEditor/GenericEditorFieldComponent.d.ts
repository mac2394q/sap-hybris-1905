import { TypedMap } from 'smarteditcommons/dtos';
import { GenericEditorComponent } from "./GenericEditorComponent";
import { GenericEditorField } from "./types";
export declare class GenericEditorFieldComponent {
    private $scope;
    field: GenericEditorField;
    model: TypedMap<any>;
    qualifier: string;
    id: string;
    ge: GenericEditorComponent;
    constructor($scope: GenericEditorFieldComponentScope);
    $onInit(): void;
}
