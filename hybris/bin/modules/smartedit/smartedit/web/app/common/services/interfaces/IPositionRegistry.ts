/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
export interface IPositionRegistry {
	register(element: HTMLElement): void;
	unregister(element: HTMLElement): void;
	getRepositionedComponents(): HTMLElement[];
	dispose(): void;
}