package de.hybris.platform.sap.agentdesktopdataexchangeb2b.events;
import de.hybris.platform.servicelayer.event.ClusterAwareEvent;
import de.hybris.platform.servicelayer.event.PublishEventContext;
import de.hybris.platform.servicelayer.event.events.AbstractEvent;
import de.hybris.platform.core.PK;

public class Agentdesktopdataexchangeb2bEvent extends AbstractEvent implements ClusterAwareEvent{

   private PK pk;

   public PK getPk(){
   return pk;
   }

   public void setPk(PK pk){
   this.pk = pk;
   }

   @Override
   public boolean canPublish(final PublishEventContext publishEventContext){

      return publishEventContext.getSourceNodeId() == publishEventContext.getTargetNodeId();

      }
}
