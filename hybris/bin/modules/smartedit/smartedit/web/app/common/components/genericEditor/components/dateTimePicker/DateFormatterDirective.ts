/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeDirective} from "smarteditcommons/di";
import {TypedMap} from "smarteditcommons/dtos";

/**
 * @ngdoc directive
 * @name dateTimePickerModule.directive:dateFormatter
 * @description
 *
 * # The dateTimePicker
 * The date formatter is for displaying the date in the desired format.
 * You can pass the desired format in the attributes of this directive and it will be shown.
 * It is  used with the <input> tag as we cant use date filter with it.
 * for eg- <input type='text'  data-date-formatter  format-type="short">
 * format-type can be short, medium etc.
 * If the format-type is not given in the directive template, by default it uses the short type
 */
@SeDirective({
	selector: '[date-formatter]',
	inputs: [
		'formatType:@'
	],
	require: 'ngModel'
})
export class DateFormatterDirective {

	public formatType: string;

	private defaultFormatType: string;
	private ngModel: TypedMap<any>;

	constructor(
		private dateFilter: any,
		private DATE_CONSTANTS: any,
		private $element: angular.IAugmentedJQuery
	) {
		this.defaultFormatType = this.DATE_CONSTANTS.ANGULAR_FORMAT;
		this.ngModel = this.$element.controller('ngModel');
	}

	$onInit(): void {
		this.ngModel.$parsers.push((data: any) => {
			return this.dateFilter(data, (this.formatType || this.defaultFormatType));
		});

		this.ngModel.$formatters.push((data: any) => {
			return this.dateFilter(data, (this.formatType || this.defaultFormatType));
		});
	}

}
