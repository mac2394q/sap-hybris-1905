import { IPrioritized } from './interfaces/IPrioritized';
import { StringUtils } from 'smarteditcommons/utils/StringUtils';
/**
 * @ngdoc service
 * @name smarteditServicesModule.service:PriorityService
 * @description
 * The PriorityService handles arrays of {@link smarteditServicesModule.interface:IPrioritized IPrioritized} elements
 */
export declare class PriorityService {
    private stringUtils;
    constructor(stringUtils: StringUtils);
    /**
     * @ngdoc method
     * @name smarteditServicesModule.service:PriorityService#sort<T>
     * @methodOf smarteditServicesModule.service:PriorityService
     *
     * @description
     * Will sort the candidate array by ascendign or descending priority.
     * Even if the priority is not defined for a number of elements, the sorting will still be consistent over invocations
     * @param {T[]} candidate the array of @link smarteditServicesModule.interface:IPrioritized IPrioritized} elements to be sorted
     * @param {boolean=} [ascending=true] if true, candidate will be sorted by ascending priority.
     * @returns {T[]} The sorted candidate array.
     */
    sort<T extends IPrioritized>(candidate: T[], ascending?: boolean): T[];
}
