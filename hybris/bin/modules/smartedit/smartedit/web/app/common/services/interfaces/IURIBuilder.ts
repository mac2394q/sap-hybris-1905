/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {TypedMap} from "smarteditcommons/dtos/TypedMap";

export interface IURIBuilder {
	build(): string;
	replaceParams(params: TypedMap<string>): IURIBuilder;
}
