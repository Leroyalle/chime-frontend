import { ChatWrapper } from '@/components/shared';

export default async function InstantMessagingCurrent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <ChatWrapper chatId={id} />;
}
