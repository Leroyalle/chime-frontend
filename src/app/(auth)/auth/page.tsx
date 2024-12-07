import { AuthModal } from '@/components/shared/modals';

export default async function Auth() {
  // FIXME: отключить авторизационные опции в хедере
  return (
    <div>
      <AuthModal />
    </div>
  );
}
