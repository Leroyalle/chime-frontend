import { Api } from '@/services/api-client';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { RoutesEnum, TokensEnum } from '../../../../../../@types';
import { notFound, redirect } from 'next/navigation';
import { FollowersWrapper } from '@/components/shared';

export default async function Followers({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });

  const user = await Api.users.getUserById({ id, headers }).catch((error) => {
    if (error.response?.status === 401) {
      return redirect(RoutesEnum.AUTH);
    }
    return notFound();
  });

  const followers = await Api.follow
    .getFollowers({ userId: user.user.id, headers })
    .catch((error) => {
      if (error.response?.status === 401) {
        return redirect(RoutesEnum.AUTH);
      }
      return notFound();
    });

  return <FollowersWrapper userId={user.user.id} initialData={followers} />;
}
