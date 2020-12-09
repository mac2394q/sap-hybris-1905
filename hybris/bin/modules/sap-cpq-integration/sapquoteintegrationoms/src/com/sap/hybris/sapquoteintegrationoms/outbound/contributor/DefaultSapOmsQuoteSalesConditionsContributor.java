package com.sap.hybris.sapquoteintegrationoms.outbound.contributor;

import de.hybris.platform.commerceservices.constants.CommerceServicesConstants;
import de.hybris.platform.core.model.order.AbstractOrderEntryModel;
import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.ordersplitting.model.ConsignmentEntryModel;
import de.hybris.platform.sap.orderexchange.constants.OrderCsvColumns;
import de.hybris.platform.sap.orderexchange.constants.SalesConditionCsvColumns;
import de.hybris.platform.sap.orderexchange.constants.SaporderexchangeConstants;
import de.hybris.platform.sap.saporderexchangeoms.outbound.impl.SapOmsSalesConditionsContributor;
import de.hybris.platform.util.DiscountValue;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;


public class DefaultSapOmsQuoteSalesConditionsContributor extends SapOmsSalesConditionsContributor
{

	private static final Logger LOG = Logger.getLogger(DefaultSapOmsQuoteSalesConditionsContributor.class);

	@Override
	protected void createOrderDiscountRows(final OrderModel order, final List<Map<String, Object>> result)
	{
		LOG.info("DefaultSapOmsQuoteSalesConditionsContributor : OrderId = " + order.getCode());
		final List<DiscountValue> discounts = order.getGlobalDiscountValues();
		int conditionCounter = getConditionCounterStartOrderDiscount();

		for (final DiscountValue discountValue : emptyIfNull(discounts))
		{

			final Map<String, Object> row = new HashMap<>();
			row.put(OrderCsvColumns.ORDER_ID, order.getCode());
			row.put(SalesConditionCsvColumns.CONDITION_ENTRY_NUMBER, SaporderexchangeConstants.HEADER_ENTRY);
			row.put(SalesConditionCsvColumns.CONDITION_VALUE, discountValue.getValue() * -1);
			row.put(SalesConditionCsvColumns.CONDITION_COUNTER, conditionCounter++);

			if (discountValue.isAbsolute())
			{
				row.put(SalesConditionCsvColumns.CONDITION_CURRENCY_ISO_CODE, order.getCurrency().getIsocode());
				row.put(SalesConditionCsvColumns.ABSOLUTE, Boolean.TRUE);
			}
			else
			{
				row.put(SalesConditionCsvColumns.ABSOLUTE, Boolean.FALSE);
			}

			if (discountValue.getCode().startsWith(PROMOTION_DISCOUNT_CODE_PREFIX))
			{
				// Add the promotional discounts that are generated by the promotion rule engine
				row.put(SalesConditionCsvColumns.CONDITION_CODE, determinePromotionDiscountCode(order, discountValue));

			}
			else
			{
				// Add other kinds of discounts
				if (discountValue.getCode().equals(CommerceServicesConstants.QUOTE_DISCOUNT_CODE))
				{
					final String conditionCode = order.getStore().getSAPConfiguration().getQuoteDiscountConditionCode();
					row.put(SalesConditionCsvColumns.CONDITION_CODE, conditionCode);
				}
				else
				{
					row.put(SalesConditionCsvColumns.CONDITION_CODE, discountValue.getCode());
				}

			}

			getBatchIdAttributes().forEach(row::putIfAbsent);
			row.put("dh_batchId", order.getCode());

			result.add(row);

		}
	}
	
	protected void createProductDiscountRows(final OrderModel order, final ConsignmentEntryModel consignmentEntry,
                       final List<Map<String, Object>> result)
       {
               final AbstractOrderEntryModel entry = consignmentEntry.getOrderEntry();
               final List<DiscountValue> discountList = consignmentEntry.getOrderEntry().getDiscountValues();
               int conditionCounter = getConditionCounterStartProductDiscount();

               for (final DiscountValue disVal : discountList)
               {
                       final Map<String, Object> row = new HashMap<>();
                       row.put(OrderCsvColumns.ORDER_ID, order.getCode());
                       row.put(SalesConditionCsvColumns.CONDITION_ENTRY_NUMBER,Integer.valueOf(consignmentEntry.getSapOrderEntryRowNumber() - 1));
                       row.put(SalesConditionCsvColumns.CONDITION_COUNTER, Integer.valueOf(conditionCounter++));
                       
                       if (disVal.isAbsolute())
                       {
                               row.put(SalesConditionCsvColumns.ABSOLUTE, Boolean.TRUE);
                               row.put(SalesConditionCsvColumns.CONDITION_CURRENCY_ISO_CODE, order.getCurrency().getIsocode());
                               row.put(SalesConditionCsvColumns.CONDITION_UNIT_CODE, entry.getUnit().getCode());
                               row.put(SalesConditionCsvColumns.CONDITION_PRICE_QUANTITY, entry.getQuantity());
                               row.put(SalesConditionCsvColumns.CONDITION_VALUE, disVal.getValue() * entry.getQuantity() * -1);
                       }
                       else
                       {
                               row.put(SalesConditionCsvColumns.ABSOLUTE, Boolean.FALSE);
                               row.put(SalesConditionCsvColumns.CONDITION_VALUE, Double.valueOf(disVal.getValue() * -1));
                       }
                       
                       if (disVal.getCode().startsWith(PROMOTION_DISCOUNT_CODE_PREFIX)) {
                               // Add the promotional discounts that are generated by the promotion rule engine
                               row.put(SalesConditionCsvColumns.CONDITION_CODE,determinePromotionDiscountCode(order, disVal));
                       } else {
                        // Add other kinds of discounts
                           if (disVal.getCode().equals("QuoteEntryDiscount"))
                           {
                                   LOG.info("Inside QuoteEntryDiscount --- DefaultSapOmsQuoteSalesConditionsContributor --- order = "
                                                   + order.getCode() + " --- disVal = " + disVal.getCode());

                                   final String conditionCode = order.getStore().getSAPConfiguration().getQuoteEntryDiscountConditionCode();
                                   row.put(SalesConditionCsvColumns.CONDITION_CODE, conditionCode);
                           }
                           else
                           {
                                   row.put(SalesConditionCsvColumns.CONDITION_CODE, disVal.getCode());
                           }
                       }

                       getBatchIdAttributes().forEach(row::putIfAbsent);
                       row.put("dh_batchId", order.getCode());

                       result.add(row);
               }
               
       }


	@Override
	protected void createProductDiscountRows(final OrderModel order, final List<Map<String, Object>> result,
			final AbstractOrderEntryModel entry)
	{

		LOG.info("DefaultSapOmsQuoteSalesConditionsContributor : OrderId = " + order.getCode());
		final List<DiscountValue> discountList = entry.getDiscountValues();
		int conditionCounter = getConditionCounterStartProductDiscount();

		for (final DiscountValue disVal : discountList)
		{
			LOG.info("DefaultSapOmsQuoteSalesConditionsContributor --- order = " + order.getCode() + " --- disVal = "
					+ disVal.getCode());

			final Map<String, Object> row = new HashMap<>();

			row.put(OrderCsvColumns.ORDER_ID, order.getCode());
			row.put(SalesConditionCsvColumns.CONDITION_ENTRY_NUMBER, entry.getEntryNumber());
			row.put(SalesConditionCsvColumns.CONDITION_COUNTER, conditionCounter++);

			if (disVal.isAbsolute())
			{
				row.put(SalesConditionCsvColumns.ABSOLUTE, Boolean.TRUE);
				row.put(SalesConditionCsvColumns.CONDITION_CURRENCY_ISO_CODE, order.getCurrency().getIsocode());
				row.put(SalesConditionCsvColumns.CONDITION_UNIT_CODE, entry.getUnit().getCode());
				row.put(SalesConditionCsvColumns.CONDITION_PRICE_QUANTITY, entry.getQuantity());
				row.put(SalesConditionCsvColumns.CONDITION_VALUE, disVal.getValue() * entry.getQuantity() * -1);
			}
			else
			{
				row.put(SalesConditionCsvColumns.ABSOLUTE, Boolean.FALSE);
				row.put(SalesConditionCsvColumns.CONDITION_VALUE, disVal.getValue() * -1);
			}

			if (disVal.getCode().startsWith(PROMOTION_DISCOUNT_CODE_PREFIX))
			{
				// Add the promotional discounts that are generated by the promotion rule engine
				row.put(SalesConditionCsvColumns.CONDITION_CODE, determinePromotionDiscountCode(order, disVal));
			}
			else
			{
				// Add other kinds of discounts
				if (disVal.getCode().equals("QuoteEntryDiscount"))
				{
					LOG.info("Inside QuoteEntryDiscount --- DefaultSapOmsQuoteSalesConditionsContributor --- order = "
							+ order.getCode() + " --- disVal = " + disVal.getCode());

					final String conditionCode = order.getStore().getSAPConfiguration().getQuoteEntryDiscountConditionCode();
					row.put(SalesConditionCsvColumns.CONDITION_CODE, conditionCode);
				}
				else
				{
					row.put(SalesConditionCsvColumns.CONDITION_CODE, disVal.getCode());
				}
			}

			getBatchIdAttributes().forEach(row::putIfAbsent);
			row.put("dh_batchId", order.getCode());

			result.add(row);
		}
	}

}