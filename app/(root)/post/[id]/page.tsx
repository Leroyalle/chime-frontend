import { PostWrapper } from '@/components/shared/post';
import { cookies } from 'next/headers';

export default async function Post({ params }: { params: { id: string } }) {
  const item = await fetch(process.env.NEXT_PUBLIC_API_URL + `/posts/${params.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  }).then((res) => res.json());

  return (
    <div>
      <PostWrapper item={item} className="w-full my-auto max-w-[640px]" />
    </div>
  );
}
