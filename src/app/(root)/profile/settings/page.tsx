// import { Api } from '@/services/api-client';
// import { AxiosHeaders } from 'axios';
// import { cookies } from 'next/headers';
// import { notFound, redirect } from 'next/navigation';

// import { EditWrapper } from '@/components/shared';
// import { RoutesEnum, TokensEnum } from '../../../../../@types';

export default async function Settings() {
  // const cookiesStore = await cookies();
  // const headers = new AxiosHeaders({
  //   Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
  // });

  // const user = await Api.users.current(headers).catch((error) => {
  //   if (error.response?.status === 401) {
  //     return redirect(RoutesEnum.AUTH);
  //   }
  //   throw error;
  // });

  // if (!user) {
  //   return notFound();
  // }

  return (
    <div className="flex flex-col items-center">
      <h1>Settings profile</h1>
    </div>
  );
}
