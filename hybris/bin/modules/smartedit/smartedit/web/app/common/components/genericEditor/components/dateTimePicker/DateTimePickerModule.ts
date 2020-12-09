/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeModule, SeValueProvider} from "smarteditcommons/di";
import {DateFormatterDirective} from "./DateFormatterDirective";
import {DateTimePickerLocalizationService} from "./DateTimePickerLocalizationService";
import {DateTimePickerComponent} from "./DateTimePickerComponent";

/**
 * @ngdoc object
 * @name dateTimePickerModule.object:resolvedLocaleToMomentLocaleMap
 *
 * @description
 * Contains a map of all inconsistent locales ISOs between SmartEdit and MomentJS
 *
 */
export const RESOLVED_LOCALE_TO_MOMENT_LOCAL_MAP_CONSTANT: SeValueProvider = {
	provide: 'resolvedLocaleToMomentLocaleMap',
	useValue: {
		in: 'id',
		zh: 'zh-cn'
	}
};

/**
 * @ngdoc object
 * @name dateTimePickerModule.object: tooltipsMap
 *
 * @description
 * Contains a map of all tooltips to be localized in the date time picker
 *
 */
export const TOOLTIPS_MAP_CONSTANT: SeValueProvider = {
	provide: 'tooltipsMap',
	useValue: {
		today: 'se.datetimepicker.today',
		clear: 'se.datetimepicker.clear',
		close: 'se.datetimepicker.close',
		selectMonth: 'se.datetimepicker.selectmonth',
		prevMonth: 'se.datetimepicker.previousmonth',
		nextMonth: 'se.datetimepicker.nextmonth',
		selectYear: 'se.datetimepicker.selectyear',
		prevYear: 'se.datetimepicker.prevyear',
		nextYear: 'se.datetimepicker.nextyear',
		selectDecade: 'se.datetimepicker.selectdecade',
		prevDecade: 'se.datetimepicker.prevdecade',
		nextDecade: 'se.datetimepicker.nextdecade',
		prevCentury: 'se.datetimepicker.prevcentury',
		nextCentury: 'se.datetimepicker.nextcentury',
		pickHour: 'se.datetimepicker.pickhour',
		incrementHour: 'se.datetimepicker.incrementhour',
		decrementHour: 'se.datetimepicker.decrementhour',
		pickMinute: 'se.datetimepicker.pickminute',
		incrementMinute: 'se.datetimepicker.incrementminute',
		decrementMinute: 'se.datetimepicker.decrementminute',
		pickSecond: 'se.datetimepicker.picksecond',
		incrementSecond: 'se.datetimepicker.incrementsecond',
		decrementSecond: 'se.datetimepicker.decrementsecond',
		togglePeriod: 'se.datetimepicker.toggleperiod',
		selectTime: 'se.datetimepicker.selecttime'
	}
};

/**
 * @ngdoc overview
 * @name dateTimePickerModule
 * @description
 * # The dateTimePickerModule
 *
 * The date time picker service module is a module used for displaying a date time picker
 *
 * Use the {@link dateTimePickerModule.directive:dateTimePicker dateTimePicker} to open the date time picker.
 *
 * Once the datetimepicker is opened, its {@link dateTimePickerModule.service:dateTimePickerLocalizationService dateTimePickerLocalizationService} is used to localize the tooling.
 */
@SeModule({
	imports: [
		'seConstantsModule',
		'smarteditServicesModule',
		'translationServiceModule',
		'functionsModule'
	],
	providers: [
		RESOLVED_LOCALE_TO_MOMENT_LOCAL_MAP_CONSTANT,
		TOOLTIPS_MAP_CONSTANT,
		DateTimePickerLocalizationService
	],
	declarations: [
		DateFormatterDirective,
		DateTimePickerComponent
	]
})
export class DateTimePickerModule {}