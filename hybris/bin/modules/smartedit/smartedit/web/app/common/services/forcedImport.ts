/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * We are doing forced imports in order to generate the types (d.ts) of below interfaces or classes correctly.
 * If we don't include the below imports, as a part of webpack tree shaking, the types will not be generated.
 * There is an open issue in typescript github regarding forced imports
 * https://github.com/Microsoft/TypeScript/issues/9191
 * https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-imports-being-elided-in-my-emit
 *
 * If an interface X extends an interface Y, make sure X has all types it needs from Y by checking index.d.ts, if not, do force import of X and Y.
 */
import './crossFrame/CrossFrameEventService';
import './interfaces/IAlertService';
import './interfaces/IBrowserService';
import './interfaces/IAnnouncementService';
import './interfaces/ICatalogService';
import './interfaces/IContextualMenuButton';
import './interfaces/IContextualMenuConfiguration';
import './interfaces/IDecorator';
import './interfaces/IExperience';
import './interfaces/IFeature';
import './interfaces/IFeatureService';
import './interfaces/IModalService';
import './interfaces/IPrioritized';
import './interfaces/IReflectable';
import './interfaces/IConfiguration';
import './rest/IRestService';
import './rest/IRestServiceFactory';
import './interfaces/IToolbarItem';
import './interfaces/IUriContext';
import './interfaces/IURIBuilder';
import './SystemEventService';
import './wizard/WizardServiceModule';
import './storage/IStorage';
import './storage/IStorageController';
import './storage/IStorageFactory';
import './storage/IStorageGateway';
import './storage/IStorageManager';
import './storage/IStorageManagerFactory';
import './storage/IStorageManagerGateway';
import './storage/IStorageOptions';
import './storage/IStorageProperties';
import './storage/IStoragePropertiesService';
import './interfaces/IResizeListener';
import './interfaces/IPositionRegistry';

import '../modules/translations/translationServiceModule';

import '../components/yDropdown/yDropDownMenu/IYDropdownMenuItem';
import '../components/tree/TreeModule';