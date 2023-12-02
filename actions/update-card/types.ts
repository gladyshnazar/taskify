import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionReturnType } from "@/lib/create-safe-action";

import { UpdateCardSchema } from "./schema";

export type InputType = z.infer<typeof UpdateCardSchema>;
export type ReturnType = ActionReturnType<InputType, Card>
