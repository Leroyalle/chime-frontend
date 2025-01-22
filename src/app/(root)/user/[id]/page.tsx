import { UserWrapper } from '@/components/shared';
import { Api } from '@/services/api-client';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { TokensEnum } from '../../../../types/constants';
import { handleApiError } from '@/lib/utils';

export default async function User({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });

  const user = await Api.users.getUserById({ id, headers }).catch(handleApiError);

  if (!user.user) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <UserWrapper initialData={user} />
    </div>
  );
}
