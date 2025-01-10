import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { PostWrapper } from '@/components/shared/post';
import { Api } from '@/services/api-client';
import { TokensEnum } from '../../../../../@types';
import { handleApiError } from '@/lib';

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });

  const post = await Api.posts.getPostById({ id, headers }).catch(handleApiError);

  return <PostWrapper initialData={post} className="max-w-[640px]" />;
}
