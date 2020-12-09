/// <reference types="angular-translate" />
import * as angular from "angular";
import { ISeComponent } from 'smarteditcommons/di';
import { TextTruncateService } from "smarteditcommons/services/text/textTruncateService";
/**
 * @ngdoc directive
 * @name SmarteditCommonsModule.component:yMoreTextComponent
 * @element more-text
 * @description
 * The component for truncating strings and adding an ellipsis.
 * If the limit is less then the string length then the string is truncated and 'more'/'less' buttons
 * are displayed to expand or collapse the string.
 *
 * @param {< String} text the text to be displayed
 * @param {< String =} limit index in text to truncate to. Default value is 100.
 * @param {< String =} moreLabelI18nKey the label property value for a more button. Default value is 'more'.
 * @param {< String =} lessLabelI18nKey the label property value for a less button. Default value is 'less'.
 * @param {< String =} ellipsis the ellipsis for a truncated text. Default value is an empty string.
 */
export declare class YMoreTextComponent implements ISeComponent {
    private textTruncateService;
    private $translate;
    private $q;
    text: string;
    linkLabel: string;
    isTruncated: boolean;
    private limit;
    private ellipsis;
    private showingMore;
    private moreLabelI18nKey;
    private lessLabelI18nKey;
    private moreLabel;
    private lessLabel;
    private truncatedText;
    constructor(textTruncateService: TextTruncateService, $translate: angular.translate.ITranslateService, $q: angular.IQService);
    $onInit(): void;
    showHideMoreText(): void;
    translateLabels(): angular.IPromise<any>;
}
