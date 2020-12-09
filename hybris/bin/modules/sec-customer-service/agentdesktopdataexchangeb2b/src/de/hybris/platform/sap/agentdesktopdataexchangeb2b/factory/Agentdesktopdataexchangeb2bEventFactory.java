package de.hybris.platform.sap.agentdesktopdataexchangeb2b.factory;

import de.hybris.platform.core.PK;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.Agentdesktopdataexchangeb2bCustomerModelCreateUpdateEvent;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.Agentdesktopdataexchangeb2bCustomerModelDeleteEvent;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.Agentdesktopdataexchangeb2bUnitModelCreateUpdateEvent;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.Agentdesktopdataexchangeb2bUnitModelDeleteEvent;


public class Agentdesktopdataexchangeb2bEventFactory
{

	public static Agentdesktopdataexchangeb2bCustomerModelCreateUpdateEvent getAgentdesktopdataexchangeb2bCustomerModelCreateEvent(
			final PK b2bCustomerPk)
	{
		final Agentdesktopdataexchangeb2bCustomerModelCreateUpdateEvent agentdesktopdataexchangeb2bCustomerModelCreateUpdateEvent = new Agentdesktopdataexchangeb2bCustomerModelCreateUpdateEvent();
		agentdesktopdataexchangeb2bCustomerModelCreateUpdateEvent.setPk(b2bCustomerPk);

		return agentdesktopdataexchangeb2bCustomerModelCreateUpdateEvent;

	}


	public static Agentdesktopdataexchangeb2bCustomerModelDeleteEvent getAgentdesktopdataexchangeb2bCustomerModelDeleteEvent()
	{

		return new Agentdesktopdataexchangeb2bCustomerModelDeleteEvent();

	}

	public static Agentdesktopdataexchangeb2bUnitModelCreateUpdateEvent getAgentdesktopdataexchangeb2bUnitModelCreateEvent(
			final PK b2bUnitPk)
	{

		final Agentdesktopdataexchangeb2bUnitModelCreateUpdateEvent agentdesktopdataexchangeb2bUnitModelCreateEvent = new Agentdesktopdataexchangeb2bUnitModelCreateUpdateEvent();
		agentdesktopdataexchangeb2bUnitModelCreateEvent.setPk(b2bUnitPk);
		return agentdesktopdataexchangeb2bUnitModelCreateEvent;
	}


	public static Agentdesktopdataexchangeb2bUnitModelDeleteEvent getAgentdesktopdataexchangeb2bUnitModelDeleteEvent()
	{

		return new Agentdesktopdataexchangeb2bUnitModelDeleteEvent();

	}

}