import { z } from "zod";
import { Card  } from "@prisma/client";

import { ActionReturnType } from "@/lib/create-safe-action";

import { DeleteCardSchema } from "./schema";

export type InputType = z.infer<typeof DeleteCardSchema>;
export type ReturnType = ActionReturnType<InputType, Card>
