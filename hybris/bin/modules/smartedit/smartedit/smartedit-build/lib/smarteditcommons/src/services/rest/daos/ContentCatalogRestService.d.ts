import { IBaseCatalogs } from 'smarteditcommons/dtos';
import { IRestServiceFactory } from "../IRestServiceFactory";
import { AbstractCachedRestService } from "../AbstractCachedRestService";
export declare class ContentCatalogRestService extends AbstractCachedRestService<IBaseCatalogs> {
    constructor(restServiceFactory: IRestServiceFactory);
}
