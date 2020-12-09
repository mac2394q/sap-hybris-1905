/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
	GatewayProxied,
	IPreviewService,
	SeInjectable,
	UrlUtils
} from 'smarteditcommons';

/** @internal */
@GatewayProxied()
@SeInjectable()
export class PreviewService extends IPreviewService {
	constructor(urlUtils: UrlUtils) {
		super(urlUtils);
	}
}

