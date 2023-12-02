import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { BoardMenu } from "./_components/board-menu";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!orgId) return { title: "Board" };
  const board = await db.board.findUnique({
    where: { id: params.boardId, orgId },
  });

  return { title: board?.title || "Board" };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const { orgId } = auth();

  if (!orgId) return redirect("/");
  const board = await db.board.findUnique({
    where: { id: params.boardId, orgId },
  });

  if (!board) return notFound();

  return (
    <div
      style={{
        background: `url(${board.imageFullUrl}) no-repeat scroll center/cover`,
      }}
      className='relative h-full'
    >
      <BoardMenu data={board} />
      <div className='absolute inset-0 bg-black/10' />
      <main className='relative pt-28 h-full'>{children}</main>
    </div>
  );
};

export default BoardIdLayout;
