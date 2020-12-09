import { Pagination } from './Pagination';
/**
 * @ngdoc object
 * @name Page.object:Page
 * @description
 * An object representing the backend response to a paged query
 */
export interface Page<T> {
    /**
     * @ngdoc object
     * @name Page.object:Pagination
     * @description
     * An object representing the returned pagination information from backend
     */
    pagination: Pagination;
    /**
     * @ngdoc property
     * @name results
     * @propertyOf Page.object:Page
     * @description
     * The array containing the elements pertaining to the requested page, its size will not exceed the requested page size.
     */
    results: T[];
    [index: string]: T[] | Pagination;
}
