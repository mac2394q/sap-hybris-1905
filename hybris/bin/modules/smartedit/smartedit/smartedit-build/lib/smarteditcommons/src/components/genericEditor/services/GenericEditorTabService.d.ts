import { GenericEditorPredicate, GenericEditorStructure, GenericEditorTab, GenericEditorTabConfiguration } from "..";
/**
 * @ngdoc service
 * @name genericEditorServicesModule.service:genericEditorTabService
 * @description
 * The genericEditorTabService is used to configure the way in which the tabs in the
 * {@link genericEditorModule.directive:genericEditor genericEditor} directive are rendered.
 *
 */
export declare class GenericEditorTabService {
    private static readonly MIN_PRIORITY;
    private static readonly DEFAULT_TAB_ID;
    private _tabsConfiguration;
    private _defaultTabPredicates;
    /**
     * @ngdoc method
     * @name genericEditorServicesModule.service:genericEditorTabService#configureTab
     * @methodOf genericEditorServicesModule.service:genericEditorTabService
     * @description
     * This method stores the configuration of the tab identified by the provided ID.
     *
     * @param {String} tabId The ID of the tab to configure.
     * @param {GenericEditorTabConfiguration} tabConfiguration The object containing the configuration of the tab.
     * @param {Number=} tabConfiguration.priority The priority of the tab. Higher numbers represent higher priority. This property is used to
     * sort tabs.
     *
     */
    configureTab(tabId: string, tabConfiguration: GenericEditorTabConfiguration): void;
    /**
     * @ngdoc method
     * @name genericEditorServicesModule.service:genericEditorTabService#getTabConfiguration
     * @methodOf genericEditorServicesModule.service:genericEditorTabService
     * @description
     * This method retrieves the configuration of a tab.
     *
     * @param {String} tabId The ID of the tab for which to retrieve its configuration.
     * @return {Object} The configuration of the tab. Can be null if no tab with the provided ID has been configured.
     *
     */
    getTabConfiguration(tabId: string): GenericEditorTabConfiguration;
    /**
     * @ngdoc method
     * @name genericEditorServicesModule.service:genericEditorTabService#sortTabs
     * @methodOf genericEditorServicesModule.service:genericEditorTabService
     * @description
     * This method sorts in place the list of tabs provided. Sorting starts with tab priority. If two or more tabs have the same priority they
     * will be sorted alphabetically by ID.
     *
     * @param {Object[]} tabsToSort The list of tabs to sort.
     *
     */
    sortTabs(tabsToSort: GenericEditorTab[]): GenericEditorTab[];
    getComponentTypeDefaultTab(componentTypeStructure: GenericEditorStructure): string;
    addComponentTypeDefaultTabPredicate(predicate: GenericEditorPredicate): void;
    private getTabPriority;
}
