import { Payload } from './Payload';
export interface Pageable extends Payload {
    currentPage: number;
    mask?: string;
    pageSize?: number;
    sort?: string;
}
