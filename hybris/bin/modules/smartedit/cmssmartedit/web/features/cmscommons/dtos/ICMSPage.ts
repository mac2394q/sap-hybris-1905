/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {CMSItem, CMSRestriction} from './';

/**
 * @description
 * Interface for cms-page information
 */
export interface ICMSPage extends CMSItem {
	label?: string;
	type?: {
		[index: string]: string
	};
	[index: string]: any;
	pageStatus: CMSPageStatus;
	approvalStatus: CmsApprovalStatus;
	displayStatus: string;
	template?: string;
	masterTemplate: string;
	title: {
		[index: string]: string;
	};
	defaultPage: boolean;
	restrictions: CMSRestriction[];
	identifier?: string;
	homepage: boolean;
}

export enum CMSPageTypes {
	ContentPage = 'ContentPage',
	CategoryPage = 'CategoryPage',
	ProductPage = 'ProductPage',
	EmailPage = 'EmailPage'
}

export enum CMSPageStatus {
	ACTIVE = 'ACTIVE',
	DELETED = 'DELETED'
}

export enum CmsApprovalStatus {
	APPROVED = 'APPROVED',
	CHECK = "CHECK",
	UNAPPROVED = "UNAPPROVED"
}