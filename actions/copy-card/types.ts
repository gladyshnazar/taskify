import { z } from "zod";
import { Card  } from "@prisma/client";

import { ActionReturnType } from "@/lib/create-safe-action";

import { CopyCardSchema } from "./schema";

export type InputType = z.infer<typeof CopyCardSchema>;
export type ReturnType = ActionReturnType<InputType, Card>
