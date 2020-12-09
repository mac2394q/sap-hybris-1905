/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from "angular";
import {
	CrossFrameEventService,
	GatewayFactory,
	IPerspectiveService,
	MessageGateway,
	SeInjectable,
	WindowUtils
} from "smarteditcommons";
import {AlertFactory} from "./alerts/AlertFactory";
import {Alert} from "./alerts/Alert";

/* @internal */
@SeInjectable()
export class HeartBeatService {
	static readonly HEART_BEAT_GATEWAY_ID = "heartBeatGateway";
	static readonly HEART_BEAT_MSG_ID = "heartBeat";

	private reconnectingAlert: Alert;
	private reconnectedAlert: Alert;

	private reconnectingInProgress = false;
	private cancellableTimeoutTimer: NodeJS.Timer;

	constructor(
		private HEART_BEAT_TIMEOUT_THRESHOLD_MS: number,
		$translate: angular.translate.ITranslateService,
		$rootScope: angular.IRootScopeService,
		$location: angular.ILocationService,
		EVENTS: any,
		STORE_FRONT_CONTEXT: string,
		private windowUtils: WindowUtils,
		private alertFactory: AlertFactory,
		private crossFrameEventService: CrossFrameEventService,
		private EVENT_STRICT_PREVIEW_MODE_REQUESTED: string,
		gatewayFactory: GatewayFactory
	) {
		this.reconnectingAlert = this.createReconnectingAlert();

		this.reconnectedAlert = alertFactory.createInfo({
			message: $translate.instant("se.heartbeat.reconnection"),
			timeout: 3000
		});

		const heartBeatGateway: MessageGateway = gatewayFactory.createGateway(
			HeartBeatService.HEART_BEAT_GATEWAY_ID
		);
		heartBeatGateway.subscribe(
			HeartBeatService.HEART_BEAT_MSG_ID,
			() => {
				this.heartBeatReceived();
			}
		);

		this.crossFrameEventService.subscribe(EVENTS.PAGE_CHANGE, () => {
			this.resetAndStop();
			// assume every page is smarteditable ¯\_(ツ)_/¯
			this.heartBeatReceived();
		});

		$rootScope.$on("$routeChangeSuccess", () => {
			if ($location.path() === STORE_FRONT_CONTEXT) {
				this.heartBeatReceived();
			}
		});

		$rootScope.$on("$routeChangeStart", () => {
			this.resetAndStop();
		});
	}


	/**
	 * Hide all alerts and cancel all pending actions and timers.
	 */
	public resetAndStop = () => {
		this.reconnectingInProgress = false;
		if (this.cancellableTimeoutTimer) {
			clearTimeout(this.cancellableTimeoutTimer);
			this.cancellableTimeoutTimer = null;
		}
		this.reconnectingAlert.hide(false);
		this.reconnectedAlert.hide(false);
	}

	/**
	 * Heartbeat received from iframe, show reconnected if connection was previously
	 * lost, and restart the timer to wait for iframe heartbeat
	 */
	private heartBeatReceived = () => {
		// resetAndStop() will clear this value
		const reconnecting = this.reconnectingInProgress;
		this.resetAndStop();
		if (reconnecting) {
			this.reconnectedAlert.show();
			this.reconnectingInProgress = false;

			// Publish an event to enable the perspective selector in case if it is disabled
			this.crossFrameEventService.publish(this.EVENT_STRICT_PREVIEW_MODE_REQUESTED, false);
		}
		this.cancellableTimeoutTimer = this.windowUtils.runTimeoutOutsideAngular(
			this.connectionLost,
			this.HEART_BEAT_TIMEOUT_THRESHOLD_MS
		);
	}

	/**
	 * Connection to iframe has been lost, show reconnected alert to user
	 */
	private connectionLost = () => {
		this.resetAndStop();
		this.reconnectingAlert.show();
		this.reconnectingInProgress = true;
	}

	private createReconnectingAlert = () => {
		function heartBeatAlertController(perspectiveService: IPerspectiveService, crossFrameEventService: CrossFrameEventService, NONE_PERSPECTIVE: string, EVENT_STRICT_PREVIEW_MODE_REQUESTED: string) {
			'ngInject';
			this.onClick = function() {
				perspectiveService.switchTo(NONE_PERSPECTIVE);
				crossFrameEventService.publish(EVENT_STRICT_PREVIEW_MODE_REQUESTED, true);
			};
		}

		return this.alertFactory.createInfo({
			controller: heartBeatAlertController,
			template: `<div>
				<span>{{ 'se.heartbeat.failure1' | translate }}</span>
				<span>
					<a data-ng-click='alert.hide(); $alertInjectedCtrl.onClick();'> {{ 'se.heartbeat.failure2' | translate }} </a>
				</span>
			</div>`,
			closeable: false,
			timeout: -1
		});
	}
}
