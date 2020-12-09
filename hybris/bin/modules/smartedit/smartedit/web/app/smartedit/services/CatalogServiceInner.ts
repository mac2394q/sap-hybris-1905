/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, ICatalogService, SeInjectable} from "smarteditcommons";

/** @internal */
@GatewayProxied()
@SeInjectable()
export class CatalogService extends ICatalogService {
}
