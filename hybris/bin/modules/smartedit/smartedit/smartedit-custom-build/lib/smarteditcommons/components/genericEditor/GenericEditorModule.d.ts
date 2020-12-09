import { SeValueProvider } from "smarteditcommons/di";
/**
 * @ngdoc object
 * @name genericEditorModule.object:GENERIC_EDITOR_UNRELATED_VALIDATION_MESSAGES_EVENT
 * @description
 * Event to notify GenericEditor about messages (errors, warnings) that can be relevant to it.
 * Any GenericEditor may receive notification from another GenericEditor that the latter received validation messages (errors, warnings) not relevant for themselves.
 * In such a situation every GenericEditor will try and see if messages are relevant to them.
 *
 * @param {Object} payload A map that contains the 'messages' and optional 'targetGenericEditorId' properties.
 * @param {Array} payload.messages List of validation messages (errors, warnings)
 * @param {String=} payload.targetGenericEditorID The id of target generic editor. Allows to send a list of messages to a specific generic editor. Otherwise the list of messages will be delivered to all generic editors.
 *
 * @example systemEventService.publishAsync(GENERIC_EDITOR_UNRELATED_VALIDATION_MESSAGES_EVENT, {messages: unrelatedValidationMessages, targetGenericEditorId: 'optional-id'});
 */
export declare const GENERIC_EDITOR_UNRELATED_VALIDATION_MESSAGES_EVENT_CONSTANT: SeValueProvider;
/**
 * @ngdoc object
 * @name genericEditorModule.object:GENERIC_EDITOR_LOADED_EVENT
 * @description
 * Event to notify subscribers that GenericEditor is loaded.
 */
export declare const GENERIC_EDITOR_LOADED_EVENT_CONSTANT: SeValueProvider;
/**
 * @ngdoc overview
 * @name genericEditorModule
 */
export declare class GenericEditorModule {
}
