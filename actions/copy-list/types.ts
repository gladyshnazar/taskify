import { z } from "zod";
import { List  } from "@prisma/client";

import { ActionReturnType } from "@/lib/create-safe-action";

import { CopyListSchema } from "./schema";

export type InputType = z.infer<typeof CopyListSchema>;
export type ReturnType = ActionReturnType<InputType, List>
