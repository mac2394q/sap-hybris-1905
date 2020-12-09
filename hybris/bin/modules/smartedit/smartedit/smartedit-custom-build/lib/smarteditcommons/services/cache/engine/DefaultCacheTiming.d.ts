import { ICacheItem, ICacheTiming } from "./interfaces";
export declare class DefaultCacheTiming implements ICacheTiming {
    private expirationAge;
    private refreshAge;
    constructor(expirationAge: number, refreshAge: number);
    setAge(item: ICacheItem<any>): void;
}
