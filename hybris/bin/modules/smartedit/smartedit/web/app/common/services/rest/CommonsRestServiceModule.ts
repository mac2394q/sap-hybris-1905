/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeModule} from 'smarteditcommons/di';
import {PermissionsRestService} from "./PermissionsRestService";
import {SettingsService} from "./SettingsService";

@SeModule({
	providers: [
		PermissionsRestService,
		SettingsService
	]
})
export class CommonsRestServiceModule {}
