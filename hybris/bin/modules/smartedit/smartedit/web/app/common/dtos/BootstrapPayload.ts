/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {TypedMap} from './TypedMap';

/*
 * Payload consisting of NgModules and constants to be added
 * to smarteditcontainer or smartedit before bootstrapping
 */
export interface BootstrapPayload {
	modules: any[];
	constants?: TypedMap<string>;
}