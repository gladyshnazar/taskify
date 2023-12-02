import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionReturnType } from "@/lib/create-safe-action";

import { CreateCardSchema } from "./schema";

export type InputType = z.infer<typeof CreateCardSchema>;
export type ReturnType = ActionReturnType<InputType, Card>
