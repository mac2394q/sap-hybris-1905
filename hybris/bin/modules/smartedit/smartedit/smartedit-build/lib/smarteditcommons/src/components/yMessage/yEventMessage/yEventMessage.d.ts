/// <reference types="angular" />
import { SystemEventService } from "smarteditcommons/services";
import { ISeComponent } from "smarteditcommons/di";
import { IYEventMessageData } from "./IYEventMessageData";
/**
 * @ngdoc directive
 * @name smarteditCommonsModule.directive:YEventMessage
 * @scope
 * @restrict E
 *
 * @description
 * The YEventMessage is a wrapper around YMessage, used to display or hide the message based on events sent through the systemEventService.
 *
 * @param {< string =} type The YMessage type
 * @param {< string =} title The YMessage title
 * @param {< string =} description The YMessage description
 * @param {< string =} showEvent The event id where the YMessage should be shown. You can update the message or title at this time,
 * by passing a {@link smarteditCommonsModule.interface:IYEventMessageData IYEventMessageData} as argument to the event service.
 * @param {< string =} hideEvent The event id where the YMessage should be hidden
 * @param {< string =} showToStart Controls whether the component is shown right away after compiling the dom
 */
export declare class YEventMessageComponent implements ISeComponent {
    private systemEventService;
    type: string;
    title: string;
    description: string;
    show: boolean;
    showToStart: string | boolean;
    recompile: () => void;
    private unregisterShowEventHandler;
    private unregisterHideEventHandler;
    constructor(systemEventService: SystemEventService);
    $onChanges(changesObj: angular.IOnChangesObject): void;
    $onInit(): void;
    $onDestroy(): void;
    showDescription(): boolean;
    showTitle(): boolean;
    showEventHandler(eventId: string, eventData: IYEventMessageData): void;
    private removeHideEventHandler;
    private removeShowEventHandler;
}
