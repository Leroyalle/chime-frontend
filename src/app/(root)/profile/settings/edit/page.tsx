import { Api } from '@/services/api-client';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { TokensEnum } from '../../../../../../@types/constants';
import { EditWrapper } from '@/components/shared';
import { handleApiError } from '@/lib';

export default async function Edit() {
  const cookiesStore = await cookies();
  const headers = new AxiosHeaders({
    Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  });

  const user = await Api.users.current(headers).catch(handleApiError);

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <EditWrapper initialData={user} />
    </div>
  );
}
