"use client";
import { useState, useRef, ElementRef, KeyboardEvent, useEffect } from "react";
import { useParams } from "next/navigation";
import { AlignLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@prisma/client";
import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEventListener } from "@/hooks/use-event-listener";
import { useClickOutside } from "@/hooks/use-click-outside";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";

interface DescriptionProps {
  data?: Card & { list: { title: string } };
}

export const Description = ({ data }: DescriptionProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  if (!data) return <Description.Skeleton />;

  return (
    <div className='flex items-start gap-x-3 w-full'>
      <AlignLeft className='h-5 w-5 mt-0.5 text-neutral-700' />
      <div className='w-full'>
        <h4 className='font-semibold text-neutral-700 mb-2'>Description</h4>
        {isEditing ? (
          <Description.Form data={data} disableEditing={disableEditing} />
        ) : (
          <div
            role='button'
            onClick={enableEditing}
            className='min-h-[79px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md'
          >
            {data.description || "Add a more detailed description"}
          </div>
        )}
      </div>
    </div>
  );
};

interface DescriptionFormProps extends DescriptionProps {
  disableEditing: () => void;
}

Description.Form = function DescriptionForm({
  data,
  disableEditing,
}: DescriptionFormProps) {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const queryClient = useQueryClient();
  const params = useParams();

  const { exec, fieldErrors } = useAction(updateCard, {
    onSuccess(data) {
      toast.success(`Card '${data.title}' successfully updated`);

      queryClient.invalidateQueries({ queryKey: ["card", data.id] });
      queryClient.invalidateQueries({ queryKey: ["card-logs", data.id] });

      disableEditing();
    },
    onError(error) {
      toast.error(error);
      disableEditing();
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }

    if (e.key === "Enter" && !e.shiftKey) {
      formRef.current?.requestSubmit();
    }
  };

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);
  useEventListener("keydown", onKeyDown);
  // TODO: useClickOutside(textareaRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    if (description === data?.description) return disableEditing();

    exec({ description, id: data!.id, boardId });
  };

  return (
    <form action={onSubmit} ref={formRef} className='space-y-2'>
      <FormTextarea
        id='description'
        ref={textareaRef}
        className='w-full mt-2'
        placeholder='Start typing...'
        defaultValue={data?.description || undefined}
        errors={fieldErrors}
      />
      <div className='flex items-center gap-x-2'>
        <FormSubmit>Save</FormSubmit>
        <Button
          type='button'
          onClick={disableEditing}
          size='sm'
          variant='ghost'
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <Skeleton className='h-6 w-6 bg-neutral-200' />
      <div className='w-full'>
        <Skeleton className='h-6 w-24 mb-2 bg-neutral-200' />
        <Skeleton className='h-[79px] w-full mb-2 bg-neutral-200' />
      </div>
    </div>
  );
};
