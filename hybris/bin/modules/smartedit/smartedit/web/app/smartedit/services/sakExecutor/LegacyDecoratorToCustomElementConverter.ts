/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* tslint:disable:max-classes-per-file */

import * as angular from 'angular';
import * as lodash from 'lodash';
import {Injectable} from '@angular/core';
import {UpgradeModule} from '@angular/upgrade/static';
import {promiseUtils, ELEMENT_UUID_ATTRIBUTE, ID_ATTRIBUTE, NodeUtils, SeDowngradeService} from 'smarteditcommons';

const CONTENT_PLACEHOLDER = 'CONTENT_PLACEHOLDER';


export interface CustomElement {

	connectedCallback?(): void;
	disconnectedCallback?(): void;
	attributeChangedCallback?(name: string, oldValue: any, newValue: any): void;
}

const scopes: string[] = [];

function customComponentClassFactory(
	upgrade: UpgradeModule,
	nodeUtils: NodeUtils,
	componentName: string
): new (...arg: any[]) => CustomElement {

	return class extends HTMLElement {


		private content: HTMLElement;
		private scope: angular.IScope;
		private PROCESSED_ATTRIBUTE_NAME = 'processed';

		/**
		 * Avoid changing anything (no DOM changes) to the custom element in the constructor (Safari throw NotSupportedError).
		 */
		constructor() {
			super();
			// this.attachShadow({mode: 'open'});
		}

		static get observedAttributes() {
			return ['active'];
		}

		connectedCallback(): void {

			if (this.isConnected && !this.getAttribute(this.PROCESSED_ATTRIBUTE_NAME)) {

				// we need to protect against a stack overflow: custom elements -> $compile -> custom elements
				this.setAttribute(this.PROCESSED_ATTRIBUTE_NAME, "true");


				let componentAttributes;
				try {
					componentAttributes = nodeUtils.collectSmarteditAttributesByElementUuid(this.getAttribute(ELEMENT_UUID_ATTRIBUTE));
				} catch (e) {
					// the original component may have disappeared in the meantime
					return;
				}

				/* compile should only happen in one layer,
				 * other layers will iteratively be compiled by their own custom element
				 * these layers are therefore to be removed before compilation
				 */
				this.content = this.content || Array.prototype.slice.call(this.childNodes).find((childNode: ChildNode) => childNode.nodeType === Node.ELEMENT_NODE);

				// const computedStyle = window.getComputedStyle(this.content);
				const placeholder = document.createElement(CONTENT_PLACEHOLDER);
				// placeholder.style.width = computedStyle.width + "px";
				// placeholder.style.height = computedStyle.height + "px";
				// placeholder.style.minHeight = "49px";
				// placeholder.style.minWidth = "51px";

				while (this.firstChild) {
					this.removeChild(this.firstChild);
				}

				this.appendChild(placeholder);


				const actualActiveState = this.getAttribute('active') === "true";
				this.setAttribute('active', 'active');
				// compile should only happen in one layer
				this.scope = this.$rootScope.$new(false);
				scopes.push(this.scopeIdentifier);

				(this.scope as any).active = actualActiveState;
				(this.scope as any).componentAttributes = componentAttributes;

				const compiledClone = this.$compile(this)(this.scope)[0];

				// const style = document.createElement('style');
				// style.innerHTML = `
				// 		:host {
				// 			display: block;
				// 		}`;

				// this.shadowRoot.appendChild(style);
				// reappending content after potentially asynchronous compilation

				/*
				 * When using templateUrl, rendering is asynchronous
				 * we need wait until the place holder is transcluded before continuing
				 */
				promiseUtils.waitOnCondition(() => !!compiledClone.querySelector(CONTENT_PLACEHOLDER), () => {
					compiledClone.querySelector(CONTENT_PLACEHOLDER).replaceWith(this.content);
					// this.shadowRoot.append(compiledClone);
				}, `decorator ${componentName} doesn't seem to contain contain an ng-transclude statement`);

			}

		}

		disconnectedCallback(): void {

			if (this.scope && !this.isConnected) {
				this.scope.$destroy();
				scopes.splice(scopes.indexOf(this.scopeIdentifier), 1);
			}
		}

		attributeChangedCallback(name: string, oldValue: any, newValue: any): void {

			/* 
			 * attributes don't change in the case of decorators:
			 * - they come from the shallow clone itself
			 * - only active flag changes but because of the full rewrapping it goes through constructor
			 */
			if (this.scope && this.isConnected && this.getAttribute(this.PROCESSED_ATTRIBUTE_NAME)) {
				(this.scope as any).active = newValue === "true";
			}
		}

		private get scopeIdentifier() {
			return `${this.getAttribute(ID_ATTRIBUTE)}_${this.tagName}`;
		}

		get $rootScope(): angular.IRootScopeService {
			return upgrade.injector.get('$rootScope');
		}

		get $compile(): angular.ICompileService {
			return upgrade.injector.get('$compile');
		}

	};
}

@SeDowngradeService()
@Injectable()
export class LegacyDecoratorToCustomElementConverter {

	private convertedDecorators: string[] = [];

	constructor(
		private upgrade: UpgradeModule,
		private nodeUtils: NodeUtils
	) {
	}

	// for e2e purposes
	getScopes() {
		return scopes;
	}
	/*
	 * Decorators are first class components:
	 * even though they are built hierarchically, they are independant on one another and their scope should not be chained.
	 * As a consequence, compiling them seperately is not an issue and thus enables converting them
	 * to custom elements.
	 */
	convert(_componentName: string): void {
		const componentName = _componentName.replace("se.", "");
		const originalName = lodash.kebabCase(componentName);
		if (!customElements.get(originalName)) { // may already have been defined through DI
			const CustomComponentClass = customComponentClassFactory(
				this.upgrade,
				this.nodeUtils,
				componentName
			);
			customElements.define(originalName, CustomComponentClass);
		}
	}

	convertIfNeeded(componentNames: string[]): void {

		componentNames.forEach((componentName) => {
			if (this.convertedDecorators.indexOf(componentName) === -1) {
				this.convertedDecorators.push(componentName);
				this.convert(componentName);
			}
		});
	}
}
