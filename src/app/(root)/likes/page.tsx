import { LikedPostsWrapper } from '@/components/shared';
import { AxiosError, AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { TokensEnum } from '../../../types';
import { Api } from '@/services/api-client';

export default async function Likes() {
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });
  try {
    const likedPosts = await Api.posts.getUserLikedPosts({ headers });
    return <LikedPostsWrapper initialData={likedPosts} />;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log(error);
    }
    console.log(error);
    return <div>Error occurred</div>;
  }
}
