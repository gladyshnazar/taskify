"use client";
import { useState, useRef, ElementRef, useEffect } from "react";
import { List } from "@prisma/client";
import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions/update-list";
import { useEventListener } from "@/hooks/use-event-listener";
import { FormInput } from "@/components/form/form-input";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState<string>(data.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updateTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
      {isEditing ? (
        <ListHeader.Active
          data={data}
          title={title}
          updateTitle={updateTitle}
          disableEditing={disableEditing}
        />
      ) : (
        <div
          onClick={enableEditing}
          className='w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent'
        >
          {title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};

interface ListHeaderActiveProps {
  data: List;
  title: string;
  updateTitle: (newTitle: string) => void;
  disableEditing: () => void;
}

ListHeader.Active = function ListHeaderActive({
  data,
  title,
  updateTitle,
  disableEditing,
}: ListHeaderActiveProps) {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const { exec, fieldErrors } = useAction(updateList, {
    onSuccess(data) {
      toast.success(`Renamed to ${data.title}`);
      updateTitle(data.title); // TODO: Learn - Optimistic update
      disableEditing();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) return disableEditing();

    exec({ title, id, boardId });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  useEventListener("keydown", onKeyDown);

  return (
    <form action={onSubmit} ref={formRef} className='flex-1 px-[2px]'>
      <input hidden id='id' name='id' value={data.id} />
      <input hidden id='boardId' name='boardId' value={data.boardId} />
      <FormInput
        ref={inputRef}
        onBlur={onBlur}
        id='title'
        placeholder='Enter list title...'
        defaultValue={title}
        className='text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white'
        errors={fieldErrors}
      />
      <button type='submit' hidden></button>
    </form>
  );
};
