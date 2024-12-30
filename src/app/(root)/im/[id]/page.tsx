import { ChatWrapper } from '@/components/shared';
import { Api } from '@/services/api-client';
import { notFound, redirect } from 'next/navigation';
import { RoutesEnum, TokensEnum } from '../../../../../@types';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';

export default async function InstantMessagingCurrent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });

  const chat = await Api.chat.getChatById({ id, headers }).catch((error) => {
    if (error.response?.status === 401) {
      return redirect(RoutesEnum.AUTH);
    }
    return notFound();
  });

  console.log(chat);

  return <ChatWrapper chatId={id} chat={chat} />;
}
