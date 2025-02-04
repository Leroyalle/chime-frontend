import { z } from 'zod';

export const messageSchema = z.object({
  message: z
    .string()
    .min(1, { message: 'Текст обязателен' })
    .max(1000, { message: 'Не более 1000' }),
});

export type TMessageSchema = z.infer<typeof messageSchema>;
