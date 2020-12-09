/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.sap.sapcpiorderexchange.service;

import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.ordercancel.model.OrderCancelRecordEntryModel;
import de.hybris.platform.sap.sapcpiadapter.model.SAPCpiOutboundOrderCancellationModel;
import de.hybris.platform.sap.sapcpiadapter.model.SAPCpiOutboundOrderModel;

import java.util.List;

/**
 * SapCpiOrderOutboundConversionService
 */
public interface SapCpiOrderOutboundConversionService {

  /**
   * convertOrderToSapCpiOrder
   * @param orderModel OrderModel
   * @return SAPCpiOutboundOrderModel
   */
  SAPCpiOutboundOrderModel convertOrderToSapCpiOrder(OrderModel orderModel);

  /**
   * convertCancelOrderToSapCpiCancelOrder
   * @param orderCancelRecordEntryModel OrderCancelRecordEntryModel
   * @return List<SAPCpiOutboundOrderCancellationModel>
   */
  List<SAPCpiOutboundOrderCancellationModel> convertCancelOrderToSapCpiCancelOrder(OrderCancelRecordEntryModel orderCancelRecordEntryModel);

}
