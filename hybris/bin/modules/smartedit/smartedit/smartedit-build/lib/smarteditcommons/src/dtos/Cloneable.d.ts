import { Payload } from './Payload';
import { Primitive } from './Primitive';
export declare type Cloneable = Primitive | Primitive[] | Payload;
/**
 * @ngdoc service
 * @name functionsModule.service:CloneableUtils
 *
 * @description
 * utility service around Cloneable objects
 */
export declare class CloneableUtils {
    /**
     * @ngdoc method
     * @name functionsModule.service:CloneableUtils#makeCloneable
     * @methodOf functionsModule.service:CloneableUtils
     * @description
     * returns a "cloneable" version of an object.
     * Something is cloneable when it can be sent through W3C postMessage.
     * To this purpose, functions must be removed from the cloneable candidate.
     * @param {Object} json the object to be made cloneable
     * @returns {Cloneable} the cloneable copy of the object
     */
    makeCloneable(_json: any): Cloneable;
    private isPrimitive;
}
