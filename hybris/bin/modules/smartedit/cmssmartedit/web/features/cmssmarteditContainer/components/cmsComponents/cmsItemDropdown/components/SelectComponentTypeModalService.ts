/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
	IModalService,
	SeInjectable,
	TypedMap
} from 'smarteditcommons';

@SeInjectable()
export class SelectComponentTypeModalService {
	constructor(
		private modalService: IModalService,
	) {}

	open(types: TypedMap<string>): angular.IPromise<string> {
		return this.modalService.open({
			title: 'se.cms.nestedcomponenteditor.select.type',
			templateInline: `<sub-type-selector class="sub-type-selector" data-sub-types="modalController.subTypes"
                data-on-sub-type-selected="modalController.onSubTypeSelected"></sub-type-selector>`,
			controller: function ctrl(modalManager: IModalService) {
				'ngInject';

				this.subTypes = Object.keys(types).map((id: string) => {
					return {
						id,
						label: types[id]
					};
				});

				this.onSubTypeSelected = function(subType: {
					id: string,
					label: string
				}) {
					modalManager.close(subType.id);
				};
			}
		});
	}
}