"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";

import { reorder } from "../_utils/reorder";
import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { toast } from "sonner";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  // Optimistic updates
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const { exec: execUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("Lists reordered");
    },
    onError(error) {
      toast.error(error);
    },
  });

  const { exec: execUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Cards reordered");
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) return;

    // Dropped in the same position
    if (
      destination.drappableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);
      execUpdateListOrder({ items, boardId });
    }

    if (type === "card") {
      let newOrderedData = [...orderedData];

      // Souce and destination list
      const sourceList = newOrderedData.find(
        list => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        list => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      // Check if cards exists on the source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if cards exists on the destination list
      if (!destList.cards) {
        destList.cards = [];
      }

      // Moving card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        ).map((item, index) => ({ ...item, order: index }));

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);

        execUpdateCardOrder({ boardId, items: reorderedCards });
        // User moves a card to another list
      } else {
        // Remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Add the card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);

        // Assign the new listId for moved card
        movedCard.listId = destination.droppableId;

        // Reorder lists
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        destList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        execUpdateCardOrder({
          boardId,
          items: [...sourceList.cards, ...destList.cards],
        });
        // TODO: Trigger server action
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='lists' type='list' direction='horizontal'>
        {provided => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='flex gap-x-3 h-full'
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className='flex-shrink-0 w-1' />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
