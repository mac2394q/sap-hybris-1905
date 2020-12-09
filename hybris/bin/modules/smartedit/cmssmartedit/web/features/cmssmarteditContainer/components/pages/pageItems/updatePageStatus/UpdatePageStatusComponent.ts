/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {CrossFrameEventService, ICatalogService, IUriContext, Page, SeComponent} from "smarteditcommons";
import {ICMSPage} from "cmscommons/dtos/ICMSPage";
import {ManagePageService} from "cmssmarteditcontainer/services/pages/ManagePageService";

/**
 * Component that updates the page status in the active catalog version to "DELETED".
 */
@SeComponent({
	templateUrl: 'updatePageStatusTemplate.html',
	inputs: ['pageInfo']
})
export class UpdatePageStatusComponent {

	public pageInfo: ICMSPage;
	public showButton: boolean = false;

	constructor(
		private managePageService: ManagePageService,
		private cmsitemsRestService: any,
		private catalogService: ICatalogService,
		private crossFrameEventService: CrossFrameEventService) {
		this.onLoad();
	}

	onLoad() {
		this.catalogService.retrieveUriContext().then((uriContext: IUriContext) => {
			this.catalogService.getContentCatalogActiveVersion(uriContext).then((activeVersion: string) => {
				this.cmsitemsRestService.get({
					pageSize: 1,
					currentPage: 0,
					itemSearchParams: 'uid:' + this.pageInfo.uid,
					catalogId: uriContext.CONTEXT_CATALOG,
					catalogVersion: activeVersion
				}).then((result: Page<ICMSPage>) => {
					this.showButton = result.pagination.totalCount === 1;
				});
			});
		});
	}

	onClickOnSync() {
		return this.managePageService.trashPageInActiveCatalogVersion(this.pageInfo.uid).then(() => {
			this.crossFrameEventService.publish("EVENT_PAGE_STATUS_UPDATED_IN_ACTIVE_CV");
		});
	}
}