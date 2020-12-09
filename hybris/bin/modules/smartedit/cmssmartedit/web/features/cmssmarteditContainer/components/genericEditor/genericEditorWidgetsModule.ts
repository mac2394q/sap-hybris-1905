/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeModule} from 'smarteditcommons';
import {RestrictionsListComponent} from './restrictionsList/RestrictionsListComponent';
import {DuplicatePrimaryNonContentPageComponent} from './pageRestore/duplicatePrimaryNonContentPage/DuplicatePrimaryNonContentPageComponent';
import {DuplicatePrimaryContentPageLabelComponent} from './pageRestore/duplicatePrimaryContentPageLabel/DuplicatePrimaryContentPageLabelComponent';
import {MissingPrimaryContentPageComponent} from './pageRestore/missingPrimaryContentPage/MissingPrimaryContentPageComponent';
import {WorkflowCreateVersionFieldComponent} from './workflowCreateVersionField/WorkflowCreateVersionFieldComponent';
import {PageInfoPageNameComponent} from './pageInfoPageName/pageInfoPageNameComponent';

/**
 * @ngdoc overview
 * @name genericEditorWidgetsModule
 *
 * @description
 * Module containing all the generic editor widgets. 
 */
@SeModule({
	imports: [],
	declarations: [
		RestrictionsListComponent,
		DuplicatePrimaryNonContentPageComponent,
		DuplicatePrimaryContentPageLabelComponent,
		MissingPrimaryContentPageComponent,
		WorkflowCreateVersionFieldComponent,
		PageInfoPageNameComponent
	]
})
export class GenericEditorWidgetsModule {}