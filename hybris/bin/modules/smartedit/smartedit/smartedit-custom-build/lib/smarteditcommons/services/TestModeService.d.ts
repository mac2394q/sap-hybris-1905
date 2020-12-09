/// <reference types="angular-resource" />
import * as angular from 'angular';
/**
 * @ngdoc service
 * @name smarteditServicesModule.service:TestModeService
 *
 * @description
 * Used to determine whether smartedit is running in a e2e (test) mode
 */
/** @internal */
export declare class TestModeService {
    private $injector;
    private readonly TEST_KEY;
    constructor($injector: angular.auto.IInjectorService);
    /**
     * @ngdoc method
     * @name smarteditServicesModule.service:TestModeService#isE2EMode
     * @methodOf smarteditServicesModule.service:TestModeService
     *
     * @description
     * returns true if smartedit is running in e2e (test) mode
     *
     * @returns {Boolean} true/false
     */
    isE2EMode(): boolean;
}
