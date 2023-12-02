"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { MoreHorizontal, XIcon } from "lucide-react";
import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";

export const BoardOptions = ({ id }: { id: string }) => {
  const { exec, isLoading } = useAction(deleteBoard, {
    onError(error) {
      toast.error(error);
    },
  });

  const onDelete = () => {
    exec({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant='transparent'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-neutral-600 text-center pb-4'>
          Board actions
        </div>
        <PopoverClose>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant='ghost'
          >
            <XIcon className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <Button
          onClick={onDelete}
          disabled={isLoading}
          variant='ghost'
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
