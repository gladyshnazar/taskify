import { z } from "zod";
import { List  } from "@prisma/client";

import { ActionReturnType } from "@/lib/create-safe-action";

import { DeleteListSchema } from "./schema";

export type InputType = z.infer<typeof DeleteListSchema>;
export type ReturnType = ActionReturnType<InputType, List>
