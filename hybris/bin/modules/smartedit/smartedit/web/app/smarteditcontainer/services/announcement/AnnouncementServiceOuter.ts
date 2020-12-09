/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import * as lo from 'lodash';
import {GatewayProxied, IAnnouncementConfig, IAnnouncementService, SeInjectable} from 'smarteditcommons';

export interface IAnnouncement extends IAnnouncementConfig {
	timer?: angular.IPromise<void>;
	id: string;
}

export const ANNOUNCEMENT_DEFAULTS = {
	timeout: 5000,
	closeable: true
};

@GatewayProxied('showAnnouncement', 'closeAnnouncement')
@SeInjectable()
export class AnnouncementService extends IAnnouncementService {

	private announcements: IAnnouncement[];

	constructor(
		private $q: angular.IQService,
		private $log: angular.ILogService,
		private lodash: lo.LoDashStatic,
		private $timeout: angular.ITimeoutService,
		private yjQuery: JQueryStatic,
		private encode: (object: any) => string) {
		super();
		this.announcements = [];
	}

	showAnnouncement(announcementConfig: IAnnouncementConfig): angular.IPromise<string> {
		this._validateAnnouncementConfig(announcementConfig);

		const announcement: IAnnouncement = this.lodash.clone(announcementConfig) as any as IAnnouncement;
		announcement.id = this.encode(announcementConfig);
		this.announcements.unshift(announcement);

		announcement.timeout = !!announcement.timeout && announcement.timeout > 0 ? announcement.timeout : ANNOUNCEMENT_DEFAULTS.timeout;
		if (announcement.timeout && announcement.timeout > 0) {
			announcement.timer = this.$timeout(() => {
				this._closeAnnouncement(announcement);
			}, announcement.timeout);
		}
		return this.$q.when(announcement.id);
	}

	closeAnnouncement(announcementId: string): angular.IPromise<void> {
		const announcement: IAnnouncement = this.announcements.find((announcementObj) => announcementObj.id === announcementId);

		if (announcement) {
			this._closeAnnouncement(announcement);
		}
		return this.$q.when();
	}

	/**
	 * Method that returns all announcements.
	 */
	_getAnnouncements(): IAnnouncement[] {
		return this.announcements;
	}

	/**
	 * Method used to close an announcement.
	 */
	private _closeAnnouncement(announcement: IAnnouncement): void {
		if (announcement.timer) {
			this.$timeout.cancel((announcement).timer);
		}

		const itemIndex = this.lodash.findIndex(this.announcements, announcement);
		(this.yjQuery('#y-announcement-' + itemIndex) as JQuery).parent().addClass('animate--out');
		this.lodash.remove(this.announcements, announcement);
	}

	/**
	 * Method that validates a given announcement data.
	 * An announcement must contain only one of either message, template, or templateUrl property.
	 */
	private _validateAnnouncementConfig(announcementConfig: IAnnouncementConfig): void {

		if (!announcementConfig.message && !announcementConfig.template && !announcementConfig.templateUrl) {
			this.$log.warn('AnnouncementService._validateAnnouncementConfig - announcement must contain at least a message, template, or templateUrl property', announcementConfig);
		}

		if ((announcementConfig.message && (announcementConfig.template || announcementConfig.templateUrl)) ||
			(announcementConfig.template && (announcementConfig.message || announcementConfig.templateUrl)) ||
			(announcementConfig.templateUrl && (announcementConfig.message || announcementConfig.template))) {

			throw new Error('AnnouncementService._validateAnnouncementConfig - only one template type is allowed for an announcement: message, template, or templateUrl');
		}

	}

}