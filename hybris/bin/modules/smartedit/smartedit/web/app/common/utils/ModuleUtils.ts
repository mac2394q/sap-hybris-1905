/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import {APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, ComponentRef, Injectable, NgModule, Provider} from '@angular/core';
import {LogService} from '../services/LogService';
import {ScriptUtils} from './ScriptUtils';
import {promiseUtils} from './PromiseUtils';
import {BootstrapPayload, Cloneable, TypedMap} from '../dtos';

/*
 * internal utility service to handle ES6 modules
 */
/* forbiddenNameSpaces angular.module:false */
/** @internal */
@Injectable()
export class ModuleUtils {

	constructor(private logService: LogService, private scriptUtils: ScriptUtils) {

	}

	public injectApplications(legacyAngularModuleName: string, applications: {location: string, name: string}[], constants: TypedMap<string> = null): Promise<BootstrapPayload> {
		const deferred = promiseUtils.defer<BootstrapPayload>();

		this.scriptUtils.inject({
			srcs: applications.map((app) => app.location),
			callback: () => {
				const modules: NgModule[] = [...window.__smartedit__.pushedModules];
				applications.forEach((app) => {
					this.addModuleToAngularJSApp(legacyAngularModuleName, app.name);
					const esModule = this.getNgModule(app.name);
					if (!!esModule) {
						modules.push(esModule);
					}
				});
				const result: BootstrapPayload = {
					modules
				};
				if (constants) {
					result.constants = constants;
				}
				deferred.resolve(result);
			}
		});

		return deferred.promise;
	}

	public getNgModule(appName: string): NgModule {
		if (window.__smartedit__.modules) {
			const moduleKey: string = Object.keys(window.__smartedit__.modules).find((key) => key.endsWith(appName));

			if (!moduleKey) {
				// this.logService.debug(
				// 	`No module was found under window.__smartedit__.modules.${moduleKey}
				// 	make sure to declare at least one of your import modules
				// 	with @SeModule annotation having ${appName} for its id property`
				// );
				return null;
			}
			return window.__smartedit__.modules[moduleKey];
		}
		return null;
	}

	public addModuleToAngularJSApp(legacyAngularModuleName: string, app: string) {
		try {
			angular.module(app);
			angular.module(legacyAngularModuleName).requires.push(app);
		} catch (ex) {
			this.logService.error(`Failed to load module ${app} into ${legacyAngularModuleName}; SmartEdit functionality may be compromised.`);
		}
	}

	public initialize(useFactory: (...args: any[]) => void, deps: any[] = []): Provider {
		return {
			provide: APP_INITIALIZER,
			useFactory() {
				useFactory.apply(undefined, arguments);
				return (component: ComponentRef<any>) => {
					// an initializer useFactory must return a function
				};
			},
			deps,
			multi: true
		};
	}

	public bootstrap(useFactory: (...args: any[]) => void, deps: any[] = []): Provider {
		return {
			provide: APP_BOOTSTRAP_LISTENER,
			useFactory() {
				useFactory.apply(undefined, arguments);
				return (component: ComponentRef<any>) => {
					// an initializer useFactory must return a function
				};
			},
			deps,
			multi: true
		};
	}

	provideValues(constants?: TypedMap<Cloneable>) {
		return Object.keys(constants || []).map((key) => {
			return {
				provide: key,
				useValue: constants[key]
			};
		});
	}
}

export const moduleUtils = new ModuleUtils(new LogService(), new ScriptUtils());
