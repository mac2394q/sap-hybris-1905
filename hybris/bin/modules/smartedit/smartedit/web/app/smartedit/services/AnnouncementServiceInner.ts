/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, IAnnouncementService, SeInjectable} from 'smarteditcommons';

@GatewayProxied('showAnnouncement', 'closeAnnouncement')
@SeInjectable()
export class AnnouncementService extends IAnnouncementService {}