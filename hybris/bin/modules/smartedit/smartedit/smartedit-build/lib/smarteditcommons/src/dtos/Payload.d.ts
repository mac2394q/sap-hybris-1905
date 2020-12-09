import { Primitive } from './Primitive';
export interface Payload {
    [index: string]: Primitive | Primitive[] | Payload | Payload[];
}
