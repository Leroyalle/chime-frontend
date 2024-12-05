import { PostWrapper } from '@/components/shared/post';
import { notFound } from 'next/navigation';

export default async function Post({ params }: { params: { id: string } }) {
  const id = (await params).id;

  if (!id) {
    return notFound();
  }
  return (
    <div>
      <PostWrapper postId={id} className="w-full my-auto max-w-[640px]" />
    </div>
  );
}
