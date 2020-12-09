import { IHomepageVersions } from './IHomepage';
import { Payload } from './Payload';
import { TypedMap } from './TypedMap';
import { ISite } from 'smarteditcommons/services';
/** from Backend */
export interface IBaseCatalogVersion extends Payload {
    active: boolean;
    pageDisplayConditions: {
        options: {
            id: string;
            label: string;
        }[];
        typecode: string;
    }[];
    uuid: string;
    version: string;
    thumbnailUrl?: string;
}
export interface ICatalogVersion extends IBaseCatalogVersion {
    name?: {
        [index: string]: string;
    };
    catalogId?: string;
    catalogName?: TypedMap<string>;
    siteDescriptor?: ISite;
    homepage?: IHomepageVersions;
}
export interface IBaseCatalog {
    catalogId: string;
    versions: IBaseCatalogVersion[];
    name?: TypedMap<string>;
}
export interface ICatalog {
    catalogId: string;
    versions: ICatalogVersion[];
    name?: TypedMap<string>;
}
export interface IBaseCatalogs {
    catalogs: IBaseCatalog[];
}
export interface ICatalogs {
    catalogs: ICatalog[];
}
