import { z } from "zod";
import { List } from "@prisma/client";

import { ActionReturnType } from "@/lib/create-safe-action";

import { CreateListSchema } from "./schema";

export type InputType = z.infer<typeof CreateListSchema>;
export type ReturnType = ActionReturnType<InputType, List>
