import { FeedWrapper } from '@/components/shared/feed';
import { Api } from '@/services/api-client';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';

export default async function Feed() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token');
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${token?.value}`,
  });
  const posts = await Api.posts.getAllPosts({ page: 1, perPage: 10, headers });

  return (
    <div>
      <FeedWrapper initialPosts={posts} className="w-full my-auto max-w-[640px]" />
    </div>
  );
}
