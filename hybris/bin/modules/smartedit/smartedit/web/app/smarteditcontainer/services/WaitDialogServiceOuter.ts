/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, IWaitDialogService, SeInjectable} from 'smarteditcommons';

/** @internal */
@GatewayProxied()
@SeInjectable()
export class WaitDialogService extends IWaitDialogService {

	private modalManager: any;

	constructor(private modalService: any) {
		super();
		this.modalManager = null;
	}

	showWaitModal(customLoadingMessageLocalizedKey?: string): void {
		if (this.modalManager == null) {
			this.modalService.open({
				templateUrl: 'waitDialog.html',
				cssClasses: "se-wait-spinner-dialog",
				controller: ['modalManager', ((modalManager: any) => {
					modalManager.loadingMessage = customLoadingMessageLocalizedKey || "se.wait.dialog.message";
					this.modalManager = modalManager;
				})]
			});
		}
	}

	hideWaitModal(): void {
		if (this.modalManager != null) {
			this.modalManager.close();
			this.modalManager = null;
		}
	}
}
