import { z } from 'zod';
import { Board } from '@prisma/client';

import { ActionReturnType } from '@/lib/create-safe-action';
import { CreateBoardSchema } from './schema';

export type InputType = z.infer<typeof CreateBoardSchema>;
export type ReturnType = ActionReturnType<InputType, Board>
