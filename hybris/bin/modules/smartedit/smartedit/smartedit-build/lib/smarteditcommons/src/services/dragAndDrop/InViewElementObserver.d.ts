/// <reference types="angular-mocks" />
import * as angular from 'angular';
import { IMousePosition } from './IDragAndDropScrollingService';
export interface QueueElement {
    component: HTMLElement;
    isIntersecting: boolean;
}
/**
 * @ngdoc service
 * @name smarteditServicesModule.service:InViewElementObserver
 * @description
 * InViewElementObserver maintains a collection of eligible DOM elements considered "in view".
 * <br/>An element is considered eligible if matches at least one of the selectors passed to the service.
 * <br/>An eligible element is in view when and only when it intersects with the view port of the window frame.
 * <br/>This services provides as well convenience methods around "in view" components:
 */
export declare class InViewElementObserver {
    private $log;
    private $document;
    private compareHTMLElementsPosition;
    private yjQuery;
    private isBlank;
    private isPointOverElement;
    private mutationObserver;
    private intersectionObserver;
    private componentsQueue;
    private selectors;
    private hasClassBasedSelectors;
    constructor($log: angular.ILogService, $document: angular.IDocumentService, compareHTMLElementsPosition: () => (node1: HTMLElement, node2: HTMLElement) => number, yjQuery: JQueryStatic, isBlank: any, isPointOverElement: (mousePosition: IMousePosition, component: HTMLElement) => boolean);
    /**
     * @ngdoc method
     * @name smarteditServicesModule.service:InViewElementObserver#elementFromPoint
     * @methodOf smarteditServicesModule.service:InViewElementObserver
     * @description
     * Retrieves the element targeted by the given mousePosition.
     * <br/>On some browsers, the native Javascript API will not work when targeting
     * an element inside an iframe from the container if a container overlay blocks it.
     * <br/>In such case we resort to returning the targeted element amongst the list of "in view" elements
     * @param {IMousePosition} mousePosition the fixed {@link smarteditServicesModule.object:IMousePosition coordinates} of the pointer
     */
    elementFromPoint(mousePosition: IMousePosition): Element;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.service:InViewElementObserver#addSelector
     * @methodOf smarteditServicesModule.service:InViewElementObserver
     * @description
     * Declares a new yjQuery selector in order to observe more elements.
     * @param {string[]} selector a {@link https://jquery.com jquery} selector
     * @param {() => void =} callback a callback to be invoked when events related to this selector occur
     * @returns {Function} unregister function
     */
    addSelector(selector: string, callback?: () => void): () => void;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.service:InViewElementObserver#getAllElements
     * @methodOf smarteditServicesModule.service:InViewElementObserver
     * @description
     * Retrieves the full list of eligible DOM elements even if they are not "in view".
     * @return {Element[]} An array of DOM elements
     */
    getAllElements(): Element[];
    /**
     * @ngdoc method
     * @name smarteditServicesModule.service:InViewElementObserver#getInViewElements
     * @methodOf smarteditServicesModule.service:InViewElementObserver
     * @description
     * Retrieves the list of currently "in view" DOM elements.
     * @return {Element[]} An array of DOM elements
     */
    getInViewElements(): Element[];
    private restart;
    private stopListener;
    private initListener;
    private _aggregateAddedOrRemovedNodes;
    private _aggregateMutationsOnClass;
    private _mutationObserverCallback;
    private _updateQueue;
    private _newMutationObserver;
    private _newIntersectionObserver;
    private _getJQuerySelector;
    private _isEligibleComponent;
    private _getEligibleElements;
    private _getAllEligibleChildren;
    private _getComponentIndexInQueue;
    private _isInDOM;
}
