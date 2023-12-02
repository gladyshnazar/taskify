import { z } from "zod";

import { ActionReturnType } from "@/lib/create-safe-action";

import { StripeRedirectSchema } from "./schema";

export type InputType = z.infer<typeof StripeRedirectSchema>;
export type ReturnType = ActionReturnType<InputType, string>
