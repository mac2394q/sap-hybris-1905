export declare const SMARTEDITLOADER_COMPONENT_NAME = "smarteditloader-component";
export declare const SMARTEDITCONTAINER_COMPONENT_NAME = "smarteditcontainer-component";
export declare const SMARTEDIT_COMPONENT_NAME = "smartedit-component";
export declare const ELEMENT_UUID_ATTRIBUTE = "data-smartedit-element-uuid";
export declare const ID_ATTRIBUTE = "data-smartedit-component-id";
export declare const TYPE_ATTRIBUTE = "data-smartedit-component-type";
export declare const NG_ROUTE_PREFIX = "ng";
export declare const I18N_RESOURCE_URI = "/smarteditwebservices/v1/i18n/translations";
export declare const CONTEXT_CATALOG = "CURRENT_CONTEXT_CATALOG";
export declare const CONTEXT_CATALOG_VERSION = "CURRENT_CONTEXT_CATALOG_VERSION";
export declare const CONTEXT_SITE_ID = "CURRENT_CONTEXT_SITE_ID";
export declare const PAGE_CONTEXT_CATALOG = "CURRENT_PAGE_CONTEXT_CATALOG";
export declare const PAGE_CONTEXT_CATALOG_VERSION = "CURRENT_PAGE_CONTEXT_CATALOG_VERSION";
export declare const PAGE_CONTEXT_SITE_ID = "CURRENT_PAGE_CONTEXT_SITE_ID";
export declare enum MUTATION_CHILD_TYPES {
    ADD_OPERATION = "addedNodes",
    REMOVE_OPERATION = "removedNodes"
}
export declare const MUTATION_TYPES: {
    CHILD_LIST: {
        NAME: string;
        ADD_OPERATION: MUTATION_CHILD_TYPES;
        REMOVE_OPERATION: MUTATION_CHILD_TYPES;
    };
    ATTRIBUTES: {
        NAME: string;
    };
};
