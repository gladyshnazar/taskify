import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionReturnType } from "@/lib/create-safe-action";

import { UpdateCardOrderSchema } from "./schema";

export type InputType = z.infer<typeof UpdateCardOrderSchema>;
export type ReturnType = ActionReturnType<InputType, Card[]>
