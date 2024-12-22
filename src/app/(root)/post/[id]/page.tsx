import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { PostWrapper } from '@/components/shared/post';
import { Api } from '@/services/api-client';
import { RoutesEnum, TokensEnum } from '../../../../../@types';

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });

  const post = await Api.posts.getPostById({ id, headers }).catch((error) => {
    if (error.response?.status === 401) {
      return redirect(RoutesEnum.AUTH);
    }
    return notFound();
  });

  return (
    <div>
      <PostWrapper initialData={post} className="w-full my-auto max-w-[640px]" />
    </div>
  );
}
