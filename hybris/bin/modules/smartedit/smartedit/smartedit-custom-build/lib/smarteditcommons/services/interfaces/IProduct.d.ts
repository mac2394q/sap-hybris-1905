/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:IProduct
 * @description
 * Interface for product information
 */
export interface IProduct {
    catalogId: string;
    catalogVersion: string;
    code: string;
    description: {
        [index: string]: string;
    };
    name: {
        [index: string]: string;
    };
    thumbnailMediaCode: string;
}
