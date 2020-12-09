/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as lo from 'lodash';
import {LanguageService} from 'smarteditcommons/services';
import {SeInjectable} from "smarteditcommons/di";
import {DropdownPopulatorInterface, } from "./DropdownPopulatorInterface";
import {DropdownPopulatorPayload, GenericEditorOption} from "..";

/**
 * @ngdoc service
 * @name dropdownPopulatorModule.service:optionsDropdownPopulator
 * @description
 * implementation of {@link dropdownPopulatorModule.DropdownPopulatorInterface DropdownPopulatorInterface} for "EditableDropdown" cmsStructureType
 * containing options attribute.
 */
@SeInjectable()
export class OptionsDropdownPopulator extends DropdownPopulatorInterface {

	constructor(
		lodash: lo.LoDashStatic,
		private $q: angular.IQService,
		public languageService: LanguageService
	) {
		super(lodash, languageService);
	}
	/**
	 * @ngdoc method
	 * @name dropdownPopulatorModule.service:optionsDropdownPopulator#populate
	 * @methodOf dropdownPopulatorModule.service:optionsDropdownPopulator
	 *
	 * @description
	 * Implementation of the {@link dropdownPopulatorModule.DropdownPopulatorInterface#populate DropdownPopulatorInterface.populate} method
	 */
	populate(payload: DropdownPopulatorPayload): angular.IPromise<GenericEditorOption[]> {
		const options = this.populateAttributes(payload.field.options as GenericEditorOption[], payload.field.idAttribute, payload.field.labelAttributes);

		if (payload.search) {
			return this.search(options, payload.search);
		}

		return this.$q.when(options);
	}
}
