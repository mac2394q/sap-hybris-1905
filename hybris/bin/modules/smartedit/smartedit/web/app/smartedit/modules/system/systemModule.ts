/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeModule} from 'smarteditcommons';
import './features/contextualMenu.scss';
import {ContextualMenuDecoratorModule} from 'smartedit/modules/system/features/contextualMenu/contextualMenuDecoratorModule';
import {SlotContextualMenuDecoratorModule} from 'smartedit/modules/system/features/slotContextualMenu/slotContextualMenuDecoratorModule';
import {SmarteditServicesModule} from 'smartedit/services';

@SeModule({
	imports: [
		ContextualMenuDecoratorModule,
		SlotContextualMenuDecoratorModule,
		SmarteditServicesModule
	]
})
export class SystemModule {}
