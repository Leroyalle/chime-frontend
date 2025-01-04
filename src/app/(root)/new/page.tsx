import { FeedWrapper } from '@/components/shared/feed';
import { Api } from '@/services/api-client';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { TokensEnum } from '../../../../@types';
import { handleApiError } from '@/lib';

export default async function New() {
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });
  const posts = await Api.posts
    .getAllPosts({ page: 1, perPage: 10, headers })
    .catch(handleApiError);

  return <FeedWrapper initialPosts={posts} className="w-full m-auto max-w-[640px]" />;
}
