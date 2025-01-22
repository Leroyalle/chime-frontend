import { AuthModal } from '@/components/shared/modals';
import { cookies } from 'next/headers';
import { TokensEnum } from '@/types';
import { redirect } from 'next/navigation';

export default async function Auth() {
  const cookiesStore = await cookies();

  if (cookiesStore.has(TokensEnum.JWT)) {
    return redirect('/');
  }

  return (
    <div>
      <AuthModal />
    </div>
  );
}
