import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionReturnType<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

/* The purpose of this createSafeAction function is to create a wrapper function around
   another function (handler) that enforces validation rules defined by a Zod schema (schema).
   It ensures that the handler function receives only valid data according to the specified
   schema and provides error handling for invalid data by returning fieldErrors. */
export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionReturnType<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionReturnType<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }

    return handler(validationResult.data);
  };
};
