import { Api } from '@/services/api-client';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { RoutesEnum, TokensEnum } from '../../../../../../@types';
import { notFound, redirect } from 'next/navigation';
import { FollowingWrapper } from '@/components/shared';

export default async function Following({ params }: { params: Promise<{ id: string }> }) {
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

  const following = await Api.follow
    .getFollowing({ userId: user.user.id, headers })
    .catch((error) => {
      if (error.response?.status === 401) {
        return redirect(RoutesEnum.AUTH);
      }
      return notFound();
    });

  console.log(following);

  return <FollowingWrapper userId={user.user.id} initialData={following} />;
}
