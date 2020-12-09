import { Payload } from 'smarteditcommons/dtos';
export interface IDragAndDropEvents {
    TRACK_MOUSE_POSITION: string;
    DROP_ELEMENT: string;
    DRAG_DROP_START: string;
    DRAG_DROP_END: string;
    DRAG_DROP_CROSS_ORIGIN_START: string;
}
/**
 * @ngdoc object
 * @name smarteditServicesModule.object:IMousePosition
 * @description
 * Pointer coordinates
 */
export interface IMousePosition extends Payload {
    /**
     * @ngdoc property
     * @name x
     * @propertyOf smarteditServicesModule.object:IMousePosition
     * @description
     * abscissa of the pointer position
     */
    x: number;
    /**
     * @ngdoc property
     * @name y
     * @propertyOf smarteditServicesModule.object:IMousePosition
     * @description
     * ordinate of the pointer position
     */
    y: number;
}
export declare type IDragEventType = 'drop' | 'dragenter' | 'dragover' | 'dragleave';
export declare const IDragEventType: {
    DROP: IDragEventType;
    DRAG_ENTER: IDragEventType;
    DRAG_OVER: IDragEventType;
    DRAG_LEAVE: IDragEventType;
};
export interface IDragAndDropScrollingService {
    toggleThrottling(isEnabled: boolean): void;
}
