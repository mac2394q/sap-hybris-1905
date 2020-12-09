import { TypedMap } from './TypedMap';
export interface BootstrapPayload {
    modules: any[];
    constants?: TypedMap<string>;
}
