/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {Component, ComponentFactoryResolver, Inject, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Location} from '@angular/common';
import {IExperience, IExperienceService, PriorityService, SeDowngradeComponent, SeRouteService, SeRouteShortcutConfig} from "smarteditcommons";
import {Router} from '@angular/router';
import './ShortcutLink.scss';
/**
 * @description
 * The shortcut link configuration.
 */
export interface SeShortcutLinkConfig extends SeRouteShortcutConfig {
	active?: boolean;
}

@SeDowngradeComponent()
@Component({
	selector: 'shortcut-link',
	templateUrl: './ShortcutLinkTemplate.html'
})
export class ShortcutLinkComponent {
	@ViewChild('container', {read: ViewContainerRef})
	containerEntry: ViewContainerRef;

	@ViewChild('defaultTemplate', {read: TemplateRef})
	defaultTemplate: TemplateRef<any>;

	constructor(
		private router: Router,
		private location: Location,
		private resolver: ComponentFactoryResolver,
		@Inject("experienceService") private experienceService: IExperienceService,
		private priorityService: PriorityService
	) {}

	ngAfterViewInit() {
		const currentExperience = this.experienceService.getCurrentExperience();
		currentExperience.then((experience) => {
			const shortcutLinks = this._getShortcutLinks(experience);
			const orderedShortcutLinks = this._orderByPriority(shortcutLinks);
			this._createShortcutLinkDynamicComponents(orderedShortcutLinks);
		});
	}

	onClick(shortcutLink: SeShortcutLinkConfig): void {
		/**
		 * Route registered in angularjs application does not work
		 * if the angular route has been used to navigate to currently previewed page.
		 * Same happening if we first navigate to angularjs page and angular routing stops working.
		 * The possible solution: use location and router service at the same time.
		 */
		this.location.go(shortcutLink.fullPath);
		this.router.navigateByUrl(shortcutLink.fullPath);
	}

	/**
	 * Creates embedded template if the shortcut link contains titleI18nKey property otherwise
	 * if the shortcut link contains shortcutComponent instance it creates a new component.
	 */
	private _createShortcutLinkDynamicComponents(shortcutLinks: SeShortcutLinkConfig[]): void {
		shortcutLinks.forEach((shortcutLink) => {
			if (shortcutLink.titleI18nKey) {
				this.containerEntry.createEmbeddedView(this.defaultTemplate, {$implicit: shortcutLink});
			} else if (shortcutLink.shortcutComponent) {
				const factory = this.resolver.resolveComponentFactory(shortcutLink.shortcutComponent);
				const component = this.containerEntry.createComponent(factory);
				(component.instance as any).shortcutLink = shortcutLink;
			}
		});
	}

	/**
	 * Retrieves the route shortcut configs using the SeRouteService. It then generates full path replacing
	 * all placeholders with values from current experience. It also verifies whether the path is active or not.
	 */
	private _getShortcutLinks(experience: IExperience): SeShortcutLinkConfig[] {
		const url = this.location.path();
		return SeRouteService.routeShortcutConfigs.map((routeShortcut) => {
			const path = routeShortcut.fullPath.replace(':siteId', experience.catalogDescriptor.siteId)
				.replace(':catalogId', experience.catalogDescriptor.catalogId)
				.replace(':catalogVersion', experience.catalogDescriptor.catalogVersion);
			const active = path === url;

			const shortcutLink: SeShortcutLinkConfig = {...routeShortcut};
			shortcutLink.fullPath = path;
			shortcutLink.active = active;
			return shortcutLink;
		});
	}

	/**
	 * Orders all shortcut links by priority. If the priority is not provided it uses the DEFAULT_PRIORITY value.
	 */
	private _orderByPriority(shortcutLinks: SeShortcutLinkConfig[]): SeShortcutLinkConfig[] {
		shortcutLinks.forEach((shortcutLink) => shortcutLink.priority = shortcutLink.priority || 500);
		return this.priorityService.sort(shortcutLinks);
	}
}