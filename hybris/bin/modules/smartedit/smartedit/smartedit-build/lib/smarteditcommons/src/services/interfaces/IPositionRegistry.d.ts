export interface IPositionRegistry {
    register(element: HTMLElement): void;
    unregister(element: HTMLElement): void;
    getRepositionedComponents(): HTMLElement[];
    dispose(): void;
}
