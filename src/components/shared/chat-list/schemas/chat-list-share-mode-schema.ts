import { z } from 'zod';

export const ChatListShareModeSchema = z.object({
  chats: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one chat.',
  }),
  message: z.string().optional(),
});
export type ChatListShareModeSchemaType = z.infer<typeof ChatListShareModeSchema>;
