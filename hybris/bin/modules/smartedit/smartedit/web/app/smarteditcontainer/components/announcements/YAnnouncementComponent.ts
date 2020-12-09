/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {ISeComponent, SeComponent} from 'smarteditcommons';
import {AnnouncementService, ANNOUNCEMENT_DEFAULTS, IAnnouncement} from 'smarteditcontainer/services/announcement/AnnouncementServiceOuter';
import './yAnnouncement.scss';

@SeComponent({
	templateUrl: 'yAnnouncementTemplate.html',
	inputs: ['announcement']
})
export class YAnnouncementComponent implements ISeComponent {

	public announcement: IAnnouncement;

	constructor(private announcementService: AnnouncementService) {
		//
	}

	hasTemplate = (): boolean => {
		return this.announcement.hasOwnProperty('template');
	}

	hasTemplateUrl = (): boolean => {
		return this.announcement.hasOwnProperty('templateUrl');
	}

	hasMessage = (): boolean => {
		return this.announcement.hasOwnProperty('message');
	}

	hasMessageTitle = (): boolean => {
		return this.announcement.hasOwnProperty('messageTitle');
	}

	hasController = (): boolean => {
		return this.announcement.hasOwnProperty('controller');
	}

	isCloseable = (): boolean => {
		return this.announcement.hasOwnProperty('closeable') ? this.announcement.closeable : ANNOUNCEMENT_DEFAULTS.closeable;
	}

	closeAnnouncement = (): void => {
		this.announcementService.closeAnnouncement(this.announcement.id);
	}

}
