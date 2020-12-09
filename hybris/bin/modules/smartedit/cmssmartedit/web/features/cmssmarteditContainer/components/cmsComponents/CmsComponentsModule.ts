/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeModule} from 'smarteditcommons';
import {SelectComponentTypeModalService, SubTypeSelectorComponent} from './cmsItemDropdown';

@SeModule({
	providers: [SelectComponentTypeModalService],
	declarations: [SubTypeSelectorComponent],
})
export class CmsComponentsModule {}
