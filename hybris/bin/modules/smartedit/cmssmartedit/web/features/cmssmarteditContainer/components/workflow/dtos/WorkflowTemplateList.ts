/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {WorkflowTemplate} from './WorkflowTemplate';

/**
 * @ngdoc interface
 * @name cmsSmarteditServicesModule.interfaces:IWorflowTemplateList
 * @description
 * Interface used by {@link cmsSmarteditServicesModule.service:WorkflowService WorkflowService} to query
 * workflow templates.
 */
export interface WorkflowTemplateList {
	templates: WorkflowTemplate[];
}