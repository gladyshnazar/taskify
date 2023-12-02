import { Card } from "@prisma/client";
import { Droppable } from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { CardItem } from "./card-item";

interface ListCardsProps {
  data: Card[];
  listId: string;
}

export const ListCards = ({ data, listId }: ListCardsProps) => {
  return (
    <Droppable droppableId={listId} type='card'>
      {provided => (
        <ol
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={cn(
            "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
            data.length > 1 ? "mt-2" : "mt-0"
          )}
        >
          {data.map((card, index) => (
            <CardItem index={index} key={card.id} data={card} />
          ))}
          {provided.placeholder}
        </ol>
      )}
    </Droppable>
  );
};
