/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeModule} from "smarteditcommons/di";

import {GenericEditorBreadcrumbComponent} from "./GenericEditorBreadcrumbComponent";
import {GenericEditorServicesModule} from "../../services/GenericEditorServicesModule";

/**
 * @ngdoc overview
 * @name genericEditorBreadcrumbModule
 *
 * @description
 * This module provides the genericEditorBreadcrumbModule component, which is used to show a breadcrumb on top of the generic editor
 * when there is more than one editor opened on top of each other. This will happen when editing nested components.
 */
@SeModule({
	imports: [
		GenericEditorServicesModule
	],
	declarations: [
		GenericEditorBreadcrumbComponent
	]
})
export class GenericEditorBreadcrumbModule {}