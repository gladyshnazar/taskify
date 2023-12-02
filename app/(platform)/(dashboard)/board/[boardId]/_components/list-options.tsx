"use client";

import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { List } from "@prisma/client";
import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-list";
import { copyList } from "@/actions/copy-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeButtonRef = useRef<ElementRef<"button">>(null);
  const { exec: execDelete } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`List is ${data.title} successfully deleted`);
      closeButtonRef.current?.click();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const listId = formData.get("listId") as string;
    const boardId = formData.get("boardId") as string;

    execDelete({ listId, boardId });
  };

  const { exec: execCopy } = useAction(copyList, {
    onSuccess(data) {
      toast.success(`List is ${data.title} successfully copied`);
      closeButtonRef.current?.click();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onCopy = (formData: FormData) => {
    const listId = formData.get("listId") as string;
    const boardId = formData.get("boardId") as string;

    execCopy({ listId, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant='ghost'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
        <div className='text-sm font-md text-center text-neutral-600 pb-4'>
          Actions
        </div>
        <PopoverClose ref={closeButtonRef} asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant='ghost'
          >
            <X className='h-4 w-4'></X>
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          variant='ghost'
        >
          Add card
        </Button>
        <form action={onCopy}>
          <input hidden name='listId' id='listId' value={data.id} />
          <input hidden name='boardId' id='boardId' value={data.boardId} />
          <FormSubmit
            variant='ghost'
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          >
            Copy list
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name='listId' id='listId' value={data.id} />
          <input hidden name='boardId' id='boardId' value={data.boardId} />
          <FormSubmit
            variant='ghost'
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          >
            Delete list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
