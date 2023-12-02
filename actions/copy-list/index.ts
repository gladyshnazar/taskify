"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CopyListSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { listId, boardId } = data;
  let list;

  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id: listId,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return { error: "List not found." };
    }

    const lastListOrder = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newListOrder = lastListOrder ? lastListOrder.order + 1 : 1;

    list = await db.list.create({
      data: {
        title: `${listToCopy.title} - Copy`,
        boardId: listToCopy.boardId,
        order: newListOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map(card => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: { cards: true },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to copy.",
    };
  }

  revalidatePath(`/organization/${boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyListSchema, handler);
