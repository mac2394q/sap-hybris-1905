/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, IPermissionService, PermissionContext, SeInjectable} from "smarteditcommons";
import * as angular from "angular";

@SeInjectable()
@GatewayProxied()
export class PermissionService extends IPermissionService {

	constructor(
		private $log: angular.ILogService,
	) {
		super();
	}

	_remoteCallRuleVerify(ruleKey: string, permissionNameObjs: PermissionContext[]) {
		if (this.ruleVerifyFunctions && this.ruleVerifyFunctions[ruleKey]) {
			return this.ruleVerifyFunctions[ruleKey].verify(permissionNameObjs);
		}

		this.$log.warn("could not call rule verify function for rule key: " + ruleKey + ", it was not found in the iframe");
		return null;
	}

}