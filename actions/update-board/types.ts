import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionReturnType } from "@/lib/create-safe-action";

import { UpdateBoardSchema } from "./schema";

export type InputType = z.infer<typeof UpdateBoardSchema>;
export type ReturnType = ActionReturnType<InputType, Board>
