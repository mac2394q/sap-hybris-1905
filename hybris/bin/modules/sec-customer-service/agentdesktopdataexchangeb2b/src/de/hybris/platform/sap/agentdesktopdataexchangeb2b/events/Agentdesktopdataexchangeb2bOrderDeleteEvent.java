package de.hybris.platform.sap.agentdesktopdataexchangeb2b.events;

public class Agentdesktopdataexchangeb2bOrderDeleteEvent extends Agentdesktopdataexchangeb2bEvent
{
	private String orderId;
	private String customerId;

	/**
	 * @return the orderId
	 */
	public String getOrderId()
	{
		return orderId;
	}

	/**
	 * @param orderId
	 *           the orderId to set
	 */
	public void setOrderId(final String orderId)
	{
		this.orderId = orderId;
	}

	/**
	 * @return the customerId
	 */
	public String getCustomerId()
	{
		return customerId;
	}

	/**
	 * @param customerId
	 *           the customerId to set
	 */
	public void setCustomerId(final String customerId)
	{
		this.customerId = customerId;
	}

}