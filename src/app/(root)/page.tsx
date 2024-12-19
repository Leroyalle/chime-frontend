import { FeedWrapper } from '@/components/shared/feed';
import { Api } from '@/services/api-client';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { RoutesEnum, TokensEnum } from '../../../@types';

export default async function Feed() {
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });
  const posts = await Api.posts.getAllPosts({ page: 1, perPage: 10, headers }).catch((error) => {
    if (error.response?.status === 401) {
      return redirect(RoutesEnum.AUTH);
    }
    throw error;
  });

  return (
    <div>
      <FeedWrapper initialPosts={posts} className="w-full my-auto max-w-[640px]" />
    </div>
  );
}
