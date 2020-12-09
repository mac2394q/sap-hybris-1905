/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {IFetchDataHandler} from "./IFetchDataHandler";
import {SeInjectable} from 'smarteditcommons/di';
import {IRestService} from "smarteditcommons/services/rest/IRestService";
import {IRestServiceFactory} from "smarteditcommons/services/rest/IRestServiceFactory";
import {Payload, TypedMap} from "smarteditcommons/dtos";
import {GenericEditorField} from "../types";

/* @internal  */
@SeInjectable()
export class FetchEnumDataHandler implements IFetchDataHandler {

	public static resetForTests() {
		FetchEnumDataHandler.cache = {};
	}

	private static cache: TypedMap<any> = {};

	private restServiceForEnum: IRestService<Payload>;

	constructor(
		private $q: angular.IQService,
		private restServiceFactory: IRestServiceFactory,
		private isBlank: (value: any) => boolean,
		private ENUM_RESOURCE_URI: string
	) {
		this.restServiceForEnum = this.restServiceFactory.get<Payload>(this.ENUM_RESOURCE_URI);
	}

	findByMask(field: GenericEditorField, search?: string): angular.IPromise<string[]> {
		return (FetchEnumDataHandler.cache[field.cmsStructureEnumType] ? this.$q.when(FetchEnumDataHandler.cache[field.cmsStructureEnumType]) : this.restServiceForEnum.get({
			enumClass: field.cmsStructureEnumType
		})).then((response) => {
			FetchEnumDataHandler.cache[field.cmsStructureEnumType] = response;
			return FetchEnumDataHandler.cache[field.cmsStructureEnumType].enums.filter((element: Payload) => {
				return this.isBlank(search) || (element.label as string).toUpperCase().indexOf(search.toUpperCase()) > -1;
			});
		});
	}

	getById(field: GenericEditorField, identifier: string): angular.IPromise<string> {
		return null;
	}

}
