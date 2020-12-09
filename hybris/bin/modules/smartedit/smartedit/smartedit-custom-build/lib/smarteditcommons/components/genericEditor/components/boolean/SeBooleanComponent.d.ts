import { ISeComponent } from "smarteditcommons/di";
import { TypedMap } from "smarteditcommons/dtos";
import { GenericEditorField, IGenericEditor } from "../..";
import './SeBoolean.scss';
/**
 * @ngdoc directive
 * @name seBooleanModule.directive:seBoolean
 * @scope
 * @restrict E
 * @element se-boolean
 *
 * @description
 * Component responsible for generating custom toggle for the {@link genericEditorModule.service:GenericEditor genericEditor}.
 *
 * The following is an example of a possible field structures that can be returned by the Structure API for seBoolean to work:
 * {
 *   cmsStructureType: "Boolean",
 *   qualifier: "someQualifier",
 *   i18nKey: 'i18nkeyForSomeQualifier',
 *   localized: false,
 *   defaultValue: true
 * }
 *
 * There is an optional property called defaultValue (which can be set to TRUE to enable the toggle by default)
 */
export declare class SeBooleanComponent implements ISeComponent {
    field: GenericEditorField;
    qualifier: string;
    model: TypedMap<any>;
    editor: IGenericEditor;
    $onInit(): void;
}
