/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {TypedMap} from 'smarteditcommons/dtos';
import {ComponentAttributes} from 'smarteditcommons/di';
import * as lo from 'lodash';

/**
 * @ngdoc service
 * @name functionsModule.service:NodeUtils
 *
 * @description
 * A collection of utility methods for Nodes.
 */
export class NodeUtils {

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
	collectSmarteditAttributesByElementUuid(elementUuid: string): ComponentAttributes {
		const element = document.querySelector(`.smartEditComponent[data-smartedit-element-uuid='${elementUuid}']`);
		if (!element) {
			throw new Error(`could not find element with uuid ${elementUuid}`);
		}
		return Array.prototype.slice.apply(element.attributes).reduce((attributes: any, node: TypedMap<string>) => {
			let attrName = node.nodeName;
			if (attrName.indexOf("smartedit-") > -1) {
				attrName = lo.camelCase(attrName.replace("data-", ""));
				attributes[attrName] = node.nodeValue;
			}
			return attributes;
		}, {});
	}

	hasLegacyAngularJSBootsrap() {
		return document.querySelector("[ng-app]")
			|| document.querySelector("[data-ng-app]")
			|| document.querySelector("[custom-app]");
	}

}

export const nodeUtils = new NodeUtils();