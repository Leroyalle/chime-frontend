import { ChatWrapper } from '@/components/shared';
import { Api } from '@/services/api-client';
import { TokensEnum } from '../../../../../@types';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { handleApiError } from '@/lib';

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

  const chat = await Api.chat.getChatById({ id, headers }).catch(handleApiError);

  return <ChatWrapper chatId={id} chat={chat} />;
}
