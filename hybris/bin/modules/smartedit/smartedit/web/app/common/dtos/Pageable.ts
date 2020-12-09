/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {Payload} from './Payload';

export interface Pageable extends Payload {

	currentPage: number;
	mask?: string;
	pageSize?: number;
	sort?: string;
}