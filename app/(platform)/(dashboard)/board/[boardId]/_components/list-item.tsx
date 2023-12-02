"use client";
import { ElementRef, useRef, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";
import { CardForm } from "./card-form";
import { ListCards } from "./list-cards";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {provided => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className='shrink-0 h-full w-[272px] select-none'
        >
          <div
            {...provided.dragHandleProps}
            className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'
          >
            <ListHeader onAddCard={enableEditing} data={data} />
            <ListCards data={data.cards} listId={data.id} />
            <CardForm
              listId={data.id}
              ref={textAreaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
