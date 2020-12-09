/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeInjectable} from 'smarteditcommons/di';
import {IPermissionsRestServiceQueryData, IPermissionsRestServiceResult} from "smarteditcommons/dtos";
import {IRestServiceFactory} from "./IRestServiceFactory";
import {IRestService} from "./IRestService";

@SeInjectable()
export class PermissionsRestService {

	private readonly URI = "/permissionswebservices/v1/permissions/principals/:user/global";

	private readonly resource: IRestService<IPermissionsRestServiceResult>;

	constructor(restServiceFactory: IRestServiceFactory) {
		this.resource = restServiceFactory.get<IPermissionsRestServiceResult>(this.URI);
	}

	get(queryData: IPermissionsRestServiceQueryData): angular.IPromise<IPermissionsRestServiceResult> {
		return this.resource.get(queryData as any).then((data: IPermissionsRestServiceResult) => {
			return {
				permissions: data.permissions
			};
		});
	}

}