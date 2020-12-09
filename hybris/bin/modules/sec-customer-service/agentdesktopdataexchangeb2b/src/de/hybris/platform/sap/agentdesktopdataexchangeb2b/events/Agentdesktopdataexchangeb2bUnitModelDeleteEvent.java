package de.hybris.platform.sap.agentdesktopdataexchangeb2b.events;

public class Agentdesktopdataexchangeb2bUnitModelDeleteEvent extends Agentdesktopdataexchangeb2bEvent
{
	private String b2bUnitUid;

	/**
	 * @return the b2bUnitUid
	 */
	public String getB2bUnitUid()
	{
		return b2bUnitUid;
	}

	/**
	 * @param b2bUnitUid
	 *           the b2bUnitUid to set
	 */
	public void setB2bUnitUid(final String b2bUnitUid)
	{
		this.b2bUnitUid = b2bUnitUid;
	}
}