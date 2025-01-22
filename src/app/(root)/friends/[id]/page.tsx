import { FriendsWrapper } from '@/components/shared/friends';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { TokensEnum } from '../../../../types';
import { Api } from '@/services/api-client';
import { handleApiError } from '@/lib/utils/handle-api-error';

export default async function Friends({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });

  const friends = await Api.follow.getFriends({ userId: id, headers }).catch(handleApiError);

  return <FriendsWrapper userId={id} initialData={friends} />;
}
