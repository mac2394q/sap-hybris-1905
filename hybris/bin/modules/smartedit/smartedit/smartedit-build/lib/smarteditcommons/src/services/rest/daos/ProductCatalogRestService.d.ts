import { IBaseCatalogs } from 'smarteditcommons/dtos/ICatalog';
import { IRestServiceFactory } from "../IRestServiceFactory";
import { AbstractCachedRestService } from "../AbstractCachedRestService";
export declare class ProductCatalogRestService extends AbstractCachedRestService<IBaseCatalogs> {
    constructor(restServiceFactory: IRestServiceFactory);
}
