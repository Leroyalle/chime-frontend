import { z } from 'zod';

export const ChatListShareModeSchema = z.object({
  users: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});
export type ChatListShareModeSchemaType = z.infer<typeof ChatListShareModeSchema>;
