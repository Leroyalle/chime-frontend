import { ChatWrapper } from '@/components/shared';

export default async function InstantMessagingCurrent({ params }: { params: { id: string } }) {
  const id = (await params).id;
  console.log(id);
  return <ChatWrapper />;
}
