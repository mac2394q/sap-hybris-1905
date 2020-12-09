/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import * as lo from 'lodash';

import {
	GatewayProxied,
	IPreviewData,
	IPreviewService,
	IRestService,
	IRestServiceFactory,
	SeInjectable,
	UrlUtils
} from 'smarteditcommons';

/** @internal */
export const LAST_PREVIEW_TICKET: string = 'cmsLastPreviewTicket';

/** @internal */
@GatewayProxied()
@SeInjectable()
export class PreviewService extends IPreviewService {

	// TODO - cache invalidation on configuration changes
	private previewRestService: IRestService<IPreviewData>;
	private previewByticketRestService: IRestService<IPreviewData>;
	private domain: string;
	private ticketIdIdentifier: string = 'ticketId';

	constructor(
		private $log: angular.ILogService,
		private $q: angular.IQService,
		private loadConfigManagerService: any,
		private PREVIEW_RESOURCE_URI: string,
		private restServiceFactory: IRestServiceFactory,
		private lodash: lo.LoDashStatic,
		private getAbsoluteURL: (domain: string, url: string) => string,
		private copy: any,
		urlUtils: UrlUtils
	) {
		super(urlUtils);
	}

	createPreview(previewData: IPreviewData): angular.IPromise<IPreviewData> {
        /**
         * We don't know about any fields coming from other extensions, but throw error for any of the fields
         * that we do know about, namely the IPreviewData interface fields
         */
		const requiredFields = [
			'catalogVersions',
			'resourcePath'
		];
		this._validatePreviewDataAttributes(previewData, requiredFields);

		return this._prepareRestService().then(() => {
			return this.previewRestService.save(previewData).then((response: IPreviewData) => {
				/**
				 * The response object being stringified, when using copy method, has a method named toJSON() because it is originally of type angular.resource.IResource<IPreviewData> and
				 * that IResource.toJSON() method is responsible to remove $promise, $resolved properties from the response object.
				 */
				const previewResponse: IPreviewData = this.copy(response);
				return previewResponse;
			}, (err: any) => {
				this.$log.error('PreviewService.createPreview() - Error creating preview');
				return this.$q.reject(err);
			});
		});
	}

	updatePreview(previewData: IPreviewData): angular.IPromise<IPreviewData> {
		const requiredFields = [
			'catalogVersions',
			'resourcePath',
			'ticketId'
		];
		this._validatePreviewDataAttributes(previewData, requiredFields);

		return this._prepareRestService().then(() => {
			return this.previewByticketRestService.update(previewData).then((response: IPreviewData) => {
				return response;
			}, (err: any) => {
				this.$log.error('PreviewService.updatePreview() - Error updating preview');
				return this.$q.reject(err);
			});
		});
	}

	getResourcePathFromPreviewUrl(previewUrl: string): angular.IPromise<string> {
		return this._prepareRestService().then(() => {
			return this.$q.when(this.getAbsoluteURL(this.domain, previewUrl));
		});
	}

	private _prepareRestService(): angular.IPromise<void> {
		if (!this.previewRestService || !this.previewByticketRestService) {
			return this.loadConfigManagerService.loadAsObject().then((configurations: any) => {

				const RESOURCE_URI = configurations.previewTicketURI || this.PREVIEW_RESOURCE_URI;

				this.previewRestService = this.restServiceFactory.get(RESOURCE_URI);
				this.previewByticketRestService = this.restServiceFactory.get(RESOURCE_URI, this.ticketIdIdentifier);

				this.domain = configurations.domain;

				return this.$q.when();
			}, (err: any) => {
				this.$log.error('PreviewService.getRestService() - Error loading configuration');
				return this.$q.reject(err);
			});
		}
		return this.$q.when();
	}

	private _validatePreviewDataAttributes(previewData: IPreviewData, requiredFields: string[]) {
		if (requiredFields) {
			requiredFields.forEach((elem) => {
				if (this.lodash.isEmpty(previewData[elem])) {
					throw new Error(`ValidatePreviewDataAttributes - ${elem} is empty`);
				}
			});
		}
	}
}
