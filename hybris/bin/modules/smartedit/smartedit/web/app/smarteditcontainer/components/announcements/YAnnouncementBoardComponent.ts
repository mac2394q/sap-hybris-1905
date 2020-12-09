/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {ISeComponent, SeComponent} from 'smarteditcommons';
import {AnnouncementService, IAnnouncement} from 'smarteditcontainer/services/announcement/AnnouncementServiceOuter';

@SeComponent({
	templateUrl: 'yAnnouncementBoardTemplate.html',
	inputs: []
})
export class YAnnouncementBoardComponent implements ISeComponent {

	constructor(private announcementService: AnnouncementService) {
		//
	}

	getAnnouncements = (): IAnnouncement[] => {
		return this.announcementService._getAnnouncements();
	}
}