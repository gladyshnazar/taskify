import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { ListContainer } from "./_components/list-container";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = auth();

  if (!orgId) return redirect("/select-org");

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId, // Get lists that are of that board Id
      board: {
        // Hey, find a board with that board id and check if its orgId matches with current user's organization id
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return <div className="p-4 h-full overflow-x-auto">
    <ListContainer boardId={params.boardId} data={lists} />
  </div>;
};

export default BoardIdPage;
