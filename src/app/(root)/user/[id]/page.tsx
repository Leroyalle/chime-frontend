import { UserWrapper } from '@/components/shared';
import { Api } from '@/services/api-client';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { RoutesEnum, TokensEnum } from '../../../../../@types/constants';

export default async function User({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });

  const user = await Api.users.getUserById({ id, headers }).catch((error) => {
    if (error.response?.status === 401) {
      return redirect(RoutesEnum.AUTH);
    }
    return notFound();
  });

  console.log(user);

  return (
    <div className="flex flex-col items-center">
      <UserWrapper initialData={user} />
    </div>
  );
}
