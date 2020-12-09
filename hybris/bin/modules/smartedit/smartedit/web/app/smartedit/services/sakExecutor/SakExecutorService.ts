/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as lodash from "lodash";
import {Inject, Injectable} from '@angular/core';
import {ID_ATTRIBUTE, SeDowngradeService, TYPE_ATTRIBUTE, WindowUtils} from 'smarteditcommons';
import {DecoratorService} from 'smartedit/services';

@SeDowngradeService()
/* @internal */
@Injectable()
export class SakExecutorService {

	public decoratorsCondition: string;

	constructor(
		@Inject(DecoratorService.TOKEN) private decoratorService: DecoratorService,
		private windowUtils: WindowUtils
	) {
	}

	wrapDecorators(projectedContent: string, element: HTMLElement): Promise<HTMLElement> {

		return this.decoratorService.getDecoratorsForComponent(element.getAttribute(TYPE_ATTRIBUTE), element.getAttribute(ID_ATTRIBUTE)).then((decorators: string[]) => {

			const template = decorators.reduce((templateacc: string, decorator: string) => {

				const decoratorSelector = lodash.kebabCase(decorator.replace("se.", ""));
				const decoratorClass = lodash.camelCase(decorator.replace("se.", ""));

				return `<${decoratorSelector} class='${decoratorClass} se-decorator-wrap'
							active='false'
							${this.createLegacyInputParam('dataSmarteditElementUuid', element)}
							${this.createLegacyInputParam('dataSmarteditComponentId', element)}
							${this.createLegacyInputParam('dataSmarteditComponentUuid', element)}
							${this.createLegacyInputParam('dataSmarteditComponentType', element)}
							${this.createLegacyInputParam('dataSmarteditCatalogVersionUuid', element)}
							${this.createLegacyInputParam('dataSmarteditContainerId', element)}
							${this.createLegacyInputParam('dataSmarteditContainerUuid', element)}
							${this.createLegacyInputParam('dataSmarteditContainerType', element)}
							component-attributes='componentAttributes'>
							${templateacc}
						</${decoratorSelector}>`;
			}, projectedContent);
			// formatting here for UNIT test purposes: remove empty lines and tabs
			return this.windowUtils.getWindow().smarteditJQuery(template.replace(/^\s*\n/gm, "").replace(/[\t]+/g, ""))[0];
		});

	}

	private createLegacyInputParam(attributeName: string, element: HTMLElement) {
		const kebab = lodash.kebabCase(attributeName as string);
		const attrValue = element.getAttribute(kebab);
		if (attrValue) {
			return `${kebab}='${attrValue}'`;
		} else {
			return '';
		}
	}

}