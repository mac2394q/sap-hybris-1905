/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as lo from 'lodash';
import {
	pageChangeEvictionTag,
	pageEvictionTag,
	rarelyChangingContent,
	Cached,
	GatewayProxied,
	IExperience,
	IExperienceService,
	IPageInfoService,
	IUriContext,
	IUrlService,
	SeInjectable,
} from 'smarteditcommons';
import {CmsApprovalStatus, ICMSPage, IPageService} from 'cmscommons';

@GatewayProxied()
@SeInjectable()
export class PageService extends IPageService {

	constructor(
		private pagesRestService: any,
		private pagesFallbacksRestService: any,
		private pagesVariationsRestService: any,
		private pageInfoService: IPageInfoService,
		private cmsitemsRestService: any,
		private experienceService: IExperienceService,
		private lodash: lo.LoDashStatic,
		private $q: angular.IQService,
		private $routeParams: angular.route.IRouteParamsService,
		private urlService: IUrlService,
		private copy: (src: any) => any
	) {
		super();
	}

	public getPageById(pageUid: string) {
		return this.pagesRestService.getById(pageUid);
	}

	@Cached({actions: [rarelyChangingContent], tags: [pageEvictionTag]})
	public getPageByUuid(pageUuid: string): angular.IPromise<ICMSPage> {
		return this.cmsitemsRestService.getById(pageUuid);
	}

	@Cached({actions: [rarelyChangingContent], tags: [pageEvictionTag, pageChangeEvictionTag]})
	public getCurrentPageInfo(): angular.IPromise<ICMSPage> {
		return this.pageInfoService.getPageUUID().then((pageUuid: string) => {
			return this.cmsitemsRestService.getById(pageUuid);
		});
	}

	public getCurrentPageInfoByVersion(versionId: string) {
		return this.pageInfoService.getPageUUID().then((pageUUID: string) => {
			return this.cmsitemsRestService.getByIdAndVersion(pageUUID, versionId);
		});
	}

	public getPrimaryPagesForPageType(pageTypeCode: string, uriParams: IUriContext): angular.IPromise<ICMSPage[]> {
		const extendedParams = this.lodash.assign({}, uriParams || {}, {
			typeCode: pageTypeCode,
			itemSearchParams: "defaultPage:true,pageStatus:ACTIVE",
			currentPage: 0,
			pageSize: 1000
		});

		return this.cmsitemsRestService.get(extendedParams).then((primaryPages: any) => {
			return primaryPages.response;
		});
	}

	public isPagePrimary(pageUid: string): angular.IPromise<boolean> {
		return this.pagesFallbacksRestService.getFallbacksForPageId(pageUid).then((fallbacks: any) => {
			return fallbacks.length === 0;
		});
	}

	public isPagePrimaryWithContext(pageUid: string, uriContext: IUriContext): angular.IPromise<boolean> {
		return this.pagesFallbacksRestService.getFallbacksForPageIdAndContext(pageUid, uriContext).then((fallbacks: any) => {
			return fallbacks.length === 0;
		});
	}

	public getPrimaryPage(variationPageId: string) {
		return this.pagesFallbacksRestService.getFallbacksForPageId(variationPageId).then((fallbacks: any) => {
			return fallbacks[0] ? this.pagesRestService.getById(fallbacks[0]) : this.$q.when();
		});
	}

	public getVariationPages(primaryPageId: string) {
		return this.pagesVariationsRestService.getVariationsForPrimaryPageId(primaryPageId).then((variationPageIds: any) => {
			return variationPageIds.length > 0 ? this.pagesRestService.get({
				uids: variationPageIds
			}) : this.$q.when([]);
		});
	}

	public updatePageById(pageUid: string, payload: ICMSPage): angular.IPromise<ICMSPage> {
		return this.pagesRestService.getById(pageUid).then((originalPage: ICMSPage) => {
			// This call is done to ensure that default promise properties are removed from the payload. 
			const originalPagePayload = this.copy(originalPage);

			payload = {...originalPagePayload, ...payload};
			return this.pagesRestService.update(pageUid, payload);
		});
	}

	public forcePageApprovalStatus(newPageStatus: CmsApprovalStatus): angular.IPromise<ICMSPage> {
		return this.getCurrentPageInfo().then((pageInfo: ICMSPage) => {
			const clonePageInfo = Object.assign({}, pageInfo);
			clonePageInfo.approvalStatus = newPageStatus;
			clonePageInfo.identifier = pageInfo.uuid;

			return this.cmsitemsRestService.update(clonePageInfo);
		});
	}

	public isPageApproved(pageParam: string | ICMSPage): angular.IPromise<boolean> {
		let promise: angular.IPromise<ICMSPage>;

		if (typeof pageParam === 'string') {
			promise = this.getPageByUuid(pageParam);
		} else {
			promise = this.$q.when(pageParam);
		}

		return promise.then((page: ICMSPage) => {
			return page.approvalStatus === CmsApprovalStatus.APPROVED;
		});
	}

	public buildUriContextForCurrentPage(): angular.IPromise<IUriContext> {
		let uriContext = {} as IUriContext;

		if (this.$routeParams.siteId && this.$routeParams.catalogId && this.$routeParams.catalogVersion) {
			uriContext = this.urlService.buildUriContext(this.$routeParams.siteId, this.$routeParams.catalogId, this.$routeParams.catalogVersion);
		}

		if (!this.lodash.isEmpty(uriContext)) {
			return this.$q.when(uriContext);
		} else {
			return this.experienceService.getCurrentExperience().then((experience: IExperience) => {
				return this.urlService.buildUriContext(
					experience.pageContext.siteId, experience.pageContext.catalogId, experience.pageContext.catalogVersion);
			});
		}
	}
}
