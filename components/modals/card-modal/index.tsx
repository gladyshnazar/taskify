"use client";
import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";

import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { AuditLog } from "@prisma/client";
import { Activity } from "./activity";

export const CardModal = () => {
  const cardModalState = useCardModal(state => state);
  const { id, isOpen, onClose } = cardModalState;

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id], // Returns queryFn on mount and when id changes
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id], // Returns queryFn on mount and when id changes
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <Header key={cardData?.id} data={cardData} />
        <div className='grid grid-cols-1 md:grid-cols-4 md:gap-4'>
          <div className='col-span-3'>
            <div className='w-full space-y-6'>
              <Description key={cardData?.id} data={cardData} />
              {auditLogsData ? (
                <Activity data={auditLogsData} />
              ) : (
                <Activity.Skeleton />
              )}
            </div>
          </div>
          <Actions key={cardData?.id} data={cardData} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
