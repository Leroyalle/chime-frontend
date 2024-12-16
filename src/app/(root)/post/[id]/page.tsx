import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { PostWrapper } from '@/components/shared/post';
import { Api } from '@/services/api-client';

export default async function Post({ params }: { params: { id: string } }) {
  const id = (await params).id;
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get('jwtToken')?.value}`,
  });

  if (!id) {
    return notFound();
  }

  const post = await Api.posts.getPostById({ id, headers });

  if (!post) {
    return notFound();
  }
  return (
    <div>
      <PostWrapper initialData={post} className="w-full my-auto max-w-[640px]" />
    </div>
  );
}
