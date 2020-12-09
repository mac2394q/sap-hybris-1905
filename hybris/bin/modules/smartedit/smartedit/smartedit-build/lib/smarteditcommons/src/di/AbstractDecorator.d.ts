import { OnDestroy } from '@angular/core';
export interface ComponentAttributes {
    [index: string]: string;
    smarteditCatalogVersionUuid: string;
    smarteditComponentId: string;
    smarteditComponentType: string;
    smarteditComponentUuid: string;
    smarteditElementUuid: string;
}
export declare abstract class AbstractDecorator implements OnDestroy {
    static getScopes(): string[];
    active: boolean;
    smarteditElementuuid: string;
    smarteditComponentId: string;
    smarteditComponentUuid: string;
    smarteditComponentType: string;
    smarteditCatalogVersionUuid: string;
    smarteditContainerId: string;
    smarteditContainerUuid: string;
    smarteditContainerType: string;
    private _cachedCcomponentAttributes;
    constructor();
    readonly componentAttributes: ComponentAttributes;
    ngOnDestroy(): void;
}
