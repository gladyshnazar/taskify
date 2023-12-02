"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModalState = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {privided => (
        <div
          {...privided.draggableProps}
          {...privided.dragHandleProps}
          ref={privided.innerRef}
          role='button'
          className='truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm'
          onClick={() => cardModalState.onOpen(data.id)}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
