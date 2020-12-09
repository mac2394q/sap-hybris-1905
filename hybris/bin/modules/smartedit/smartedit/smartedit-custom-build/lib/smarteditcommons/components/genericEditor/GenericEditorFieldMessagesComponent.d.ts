import { GenericEditorField } from "../";
/**
 * @ngdoc directive
 * @name genericEditorModule.component:seGenericEditorFieldMessages
 * @element se-generic-editor-field-messages
 *
 * @description
 * Component responsible for displaying validation messages like errors or warnings.
 *
 * @param {< Object} field The field object that contains array of messages.
 * @param {< String} qualifier For a non-localized field, it is the actual field.qualifier. For a localized field, it is the ISO code of the language.
 */
export declare class SeGenericEditorFieldMessagesComponent {
    private VALIDATION_MESSAGE_TYPES;
    field: GenericEditorField;
    qualifier: string;
    errors: string[];
    warnings: string[];
    private previousMessages;
    constructor(VALIDATION_MESSAGE_TYPES: any);
    getFilteredMessagesByType(messageType: string): string[];
    $doCheck(): void;
}
