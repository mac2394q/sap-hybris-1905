package de.hybris.platform.sap.agentdesktopdataexchangeb2b.events;

public class Agentdesktopdataexchangeb2bCustomerModelDeleteEvent extends Agentdesktopdataexchangeb2bEvent
{

	private String b2bCustomerUid;

	/**
	 * @return the b2bCustomerUid
	 */
	public String getB2bCustomerUid()
	{
		return b2bCustomerUid;
	}

	/**
	 * @param b2bCustomerUid
	 *           the b2bCustomerUid to set
	 */
	public void setB2bCustomerUid(final String b2bCustomerUid)
	{
		this.b2bCustomerUid = b2bCustomerUid;
	}
}