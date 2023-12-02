"use client";
import { Card } from "@prisma/client";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";

import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionsProps {
  data?: Card & { list: { title: string } };
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { exec: execCopy, isLoading: isLoadingCopy } = useAction(copyCard, {
    onSuccess(data) {
      toast.success(`Card ${data.title} successfully copied`);
      cardModal.onClose();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const { exec: execDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess(data) {
        toast.success(`Card ${data.title} successfully deleted`);
        cardModal.onClose();
      },
      onError(error) {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    execCopy({ id: data!.id, boardId });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    execDelete({ id: data!.id, boardId });
  };

  if (!data) return <Actions.Skeleton />;

  return (
    <div className='space-y-2 mt-2'>
      <h4 className='text-xs font-semibold'>Actions</h4>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant='grey'
        className='w-full justify-start'
        size='inline'
      >
        <Copy className='h-4 w-4 mr-2' />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant='grey'
        className='w-full justify-start'
        size='inline'
      >
        <Trash className='h-4 w-4 mr-2' />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className='space-y mt-2'>
      <Skeleton className='w-10 h-4 bg-neutral-200' />
      <Skeleton className='w-full h-9 bg-neutral-200' />
      <Skeleton className='w-full h-9 bg-neutral-200' />
    </div>
  );
};
