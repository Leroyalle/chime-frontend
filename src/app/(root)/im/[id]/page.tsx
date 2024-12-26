import { ChatWrapper } from '@/components/shared';

export default async function InstantMessagingCurrent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id);

  return <ChatWrapper chatId={'dca84979-7147-410f-9d12-69cd9c0fc6b2'} />;
}
