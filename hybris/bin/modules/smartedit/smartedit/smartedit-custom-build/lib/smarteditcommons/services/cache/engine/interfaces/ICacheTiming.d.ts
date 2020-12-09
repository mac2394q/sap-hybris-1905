import { ICacheItem } from "./ICacheItem";
export interface ICacheTiming {
    setAge(item: ICacheItem<any>): void;
}
