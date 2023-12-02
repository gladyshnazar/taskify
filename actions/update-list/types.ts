import { z } from "zod";
import { List } from "@prisma/client";

import { ActionReturnType } from "@/lib/create-safe-action";

import { UpdateListSchema } from "./schema";

export type InputType = z.infer<typeof UpdateListSchema>;
export type ReturnType = ActionReturnType<InputType, List>
