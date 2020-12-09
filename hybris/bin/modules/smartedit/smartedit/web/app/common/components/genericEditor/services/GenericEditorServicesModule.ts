/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {diNameUtils, SeModule} from "smarteditcommons/di";

import {GenericEditorTabService} from "./GenericEditorTabService";
import {DEFAULT_GENERIC_EDITOR_FLOAT_PRECISION, EditorFieldMappingService} from "./EditorFieldMappingService";
import {SeValidationMessageParser} from "./SeValidationMessageParser";
import {
	DEFAULT_EDITOR_POP_FROM_STACK_EVENT,
	DEFAULT_EDITOR_PUSH_TO_STACK_EVENT,
	GenericEditorStackService
} from "./GenericEditorStackService";
import {FetchEnumDataHandler} from "./FetchEnumDataHandler";

/**
 * @ngdoc overview
 * @name genericEditorServicesModule
 */
@SeModule({
	providers: [
		diNameUtils.makeValueProvider({DEFAULT_GENERIC_EDITOR_FLOAT_PRECISION}),
		diNameUtils.makeValueProvider({DEFAULT_EDITOR_POP_FROM_STACK_EVENT}),
		diNameUtils.makeValueProvider({DEFAULT_EDITOR_PUSH_TO_STACK_EVENT}),
		GenericEditorStackService,
		EditorFieldMappingService,
		SeValidationMessageParser,
		GenericEditorTabService,
		FetchEnumDataHandler,
	]
})
export class GenericEditorServicesModule {}