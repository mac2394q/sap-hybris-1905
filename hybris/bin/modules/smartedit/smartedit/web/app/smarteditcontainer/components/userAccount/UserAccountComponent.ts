/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {CrossFrameEventService, ISessionService, ISeComponent, SeComponent} from 'smarteditcommons';
import {IframeManagerService} from 'smarteditcontainer/services';

import './UserAccount.scss';

@SeComponent({
	templateUrl: 'userAccountTemplate.html'
})
export class UserAccountComponent implements ISeComponent {
	public username: string;
	private unregUserChanged: any;

	constructor(
		private authenticationService: any,
		private iframeManagerService: IframeManagerService,
		private crossFrameEventService: CrossFrameEventService,
		private sessionService: ISessionService,
		private EVENTS: any
	) {}

	$onInit() {
		this.unregUserChanged = this.crossFrameEventService.subscribe(this.EVENTS.USER_HAS_CHANGED, this.getUsername.bind(this));
		this.getUsername();
	}

	signOut() {
		this.authenticationService.logout();
		this.iframeManagerService.setCurrentLocation(null);
	}

	$onDestroy() {
		this.unregUserChanged();
	}

	getUsername() {
		this.sessionService.getCurrentUserDisplayName().then((displayName) => {
			this.username = displayName;
		});
	}
}