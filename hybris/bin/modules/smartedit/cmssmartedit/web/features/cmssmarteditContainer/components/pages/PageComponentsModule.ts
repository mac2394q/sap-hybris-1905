/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeModule} from 'smarteditcommons';
import {PermanentlyDeletePageItemComponent, RestorePageItemComponent} from './pageItems';
import {PageInfoMenuComponent} from './pageInfoMenu/PageInfoMenuComponent';
import {PageInfoMenuService} from './pageInfoMenu/services/PageInfoMenuService';
import {HomepageIconComponent} from "./homepageIcon/HomepageIconComponent";
import {ClonePageItemComponent} from "./pageItems/clonePageItem/ClonePageItemComponent";
import {DeletePageItemComponent} from "./pageItems/deletePageItem/DeletePageItemComponent";
import {EditPageItemComponent} from "./pageItems/editPageItem/EditPageItemComponent";
import {SyncPageItemComponent} from "./pageItems/syncPageItem/SyncPageItemComponent";
import {UpdatePageStatusComponent} from "./pageItems/updatePageStatus/UpdatePageStatusComponent";
import {PageEditorModalService} from "./editPageModal/pageEditorModalService";
import {RestrictionsPageListIconComponent} from "./restrictionsPageListIcon/RestrictionsPageListIconComponent";
import {TrashLinkComponent} from './trashLink/TrashLinkComponent';
import {PagesLinkComponent} from './pagesLink/PagesLinkComponent';

/**
 * @ngdoc overview
 * @name pageComponentsModule
 *
 * @description
 * Module containing all the components and services necessary to manage a page. 
 */
@SeModule({
	imports: [
		'typeStructureRestServiceModule',
		'pageServiceModule',
		'seConstantsModule',
		'cmsSmarteditServicesModule',
		'smarteditServicesModule',
		'clonePageWizardServiceModule',
		'syncPageModalServiceModule',
		'genericEditorModalServiceModule',
		'contextAwarePageStructureServiceModule',
		'cmssmarteditContainerTemplates',
		'translationServiceModule'
	],
	declarations: [
		PageInfoMenuComponent,
		PermanentlyDeletePageItemComponent,
		RestorePageItemComponent,
		HomepageIconComponent,
		ClonePageItemComponent,
		DeletePageItemComponent,
		EditPageItemComponent,
		SyncPageItemComponent,
		UpdatePageStatusComponent,
		RestrictionsPageListIconComponent,
		TrashLinkComponent,
		PagesLinkComponent
	],
	providers: [
		PageInfoMenuService,
		PageEditorModalService
	]
})
export class PageComponentsModule {}
