/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {ISeComponent, SeComponent} from 'smarteditcommons';

@SeComponent({
	templateUrl: 'subTypeSelectorTemplate.html',
	inputs: ['subTypes', 'onSubTypeSelected']
})
export class SubTypeSelectorComponent implements ISeComponent {
	onSubTypeSelected: (subType: {id: string, label: string}) => void;
	onChange(subType: {id: string, label: string}): void {
		this.onSubTypeSelected(subType);
	}
}
