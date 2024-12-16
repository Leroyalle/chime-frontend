import { UserWrapper } from '@/components/shared/user';
import { Api } from '@/services/api-client';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function User({ params }: { params: { id: string } }) {
  const id = (await params).id;
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get('jwtToken')?.value}`,
  });

  const user = await Api.users.getUserById({ id, headers });

  if (!user) {
    return notFound();
  }

  console.log(user);
  return (
    <div className="flex flex-col items-center">
      <UserWrapper initialData={user} />
    </div>
  );
}
