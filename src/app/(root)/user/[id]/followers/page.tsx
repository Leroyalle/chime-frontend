import { Api } from '@/services/api-client';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { TokensEnum } from '../../../../../types';
import { FollowersWrapper } from '@/components/shared';
import { handleApiError } from '@/lib/utils';

export default async function Followers({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });

  const user = await Api.users.getUserById({ id, headers }).catch(handleApiError);

  const followers = await Api.follow
    .getFollowers({ userId: user.user.id, headers })
    .catch(handleApiError);

  return <FollowersWrapper userId={user.user.id} initialData={followers} />;
}
