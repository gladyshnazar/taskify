import { z } from "zod";
import { List } from "@prisma/client";

import { ActionReturnType } from "@/lib/create-safe-action";

import { UpdateListOrderSchema } from "./schema";

export type InputType = z.infer<typeof UpdateListOrderSchema>;
export type ReturnType = ActionReturnType<InputType, List[]>
