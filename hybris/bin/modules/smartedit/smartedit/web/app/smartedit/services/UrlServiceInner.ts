/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, IUrlService, SeDowngradeService, SeInjectable} from 'smarteditcommons';

/** @internal */
@SeDowngradeService(IUrlService.TOKEN)
@GatewayProxied('openUrlInPopup', 'path')
@SeInjectable()
export class UrlService extends IUrlService {
}
