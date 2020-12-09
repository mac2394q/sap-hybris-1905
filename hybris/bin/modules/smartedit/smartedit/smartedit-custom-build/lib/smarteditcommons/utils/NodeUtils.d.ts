import { ComponentAttributes } from 'smarteditcommons/di';
/**
 * @ngdoc service
 * @name functionsModule.service:NodeUtils
 *
 * @description
 * A collection of utility methods for Nodes.
 */
export declare class NodeUtils {
    /**
     * @ngdoc method
     * @name functionsModule.service:NodeUtils#collectSmarteditAttributes
     * @methodOf functionsModule.service:NodeUtils#collectSmarteditAttributes
     *
     * @description
     * Retrieves all the attributes of an overlay Node (identified by its data-smartedit-element-uuid attribute) containing with data-smartedit- or smartedit-
     * and package them as a map of key values.
     * Keys are stripped of data- and are turned to camelcase
     * @returns {JSON} map of key values.
     */
    collectSmarteditAttributesByElementUuid(elementUuid: string): ComponentAttributes;
    hasLegacyAngularJSBootsrap(): Element;
}
export declare const nodeUtils: NodeUtils;
