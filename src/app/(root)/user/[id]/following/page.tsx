import { Api } from '@/services/api-client';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { TokensEnum } from '../../../../../types';
import { FollowingWrapper } from '@/components/shared';
import { handleApiError } from '@/lib/utils';

export default async function Following({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });

  const user = await Api.users.getUserById({ id, headers }).catch(handleApiError);

  const following = await Api.follow
    .getFollowing({ userId: user.user.id, headers })
    .catch(handleApiError);

  return <FollowingWrapper userId={user.user.id} initialData={following} />;
}
