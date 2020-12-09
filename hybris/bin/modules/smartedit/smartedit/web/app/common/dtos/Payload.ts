/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {Primitive} from './Primitive';

export interface Payload {
	[index: string]: Primitive | Primitive[] | Payload | Payload[];
}

