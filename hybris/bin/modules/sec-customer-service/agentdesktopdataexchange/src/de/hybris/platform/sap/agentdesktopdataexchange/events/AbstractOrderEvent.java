package de.hybris.platform.sap.agentdesktopdataexchange.events;

import de.hybris.platform.core.PK;


/**
 *
 */
public class AbstractOrderEvent extends AgentDesktopAbstractEvent
{
	private PK orderPK;

	/**
	 * @return the orderPK
	 */
	public PK getOrderPK()
	{
		return orderPK;
	}

	/**
	 * @param orderPK
	 *           the orderPK to set
	 */
	public void setOrderPK(final PK orderPK)
	{
		this.orderPK = orderPK;
	}
}
