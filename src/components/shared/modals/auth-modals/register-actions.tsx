import React, { useState } from 'react';
import { RegisterForm, CodeForm } from '../../forms';

interface Props {
  onChangeTab: VoidFunction;
  className?: string;
}

export const RegisterActions: React.FC<Props> = ({ onChangeTab }) => {
  const [userId, setUserId] = useState<number>(0);
  const [currentRegisterAction, setCurrentRegisterAction] = useState<'credentials' | 'code'>(
    'credentials',
  );

  const onSuccessSendEmail = (userId: number) => {
    setCurrentRegisterAction('code');
    setUserId(userId);
  };
  return (
    <>
      {currentRegisterAction === 'credentials' ? (
        <RegisterForm
          onSuccess={onSuccessSendEmail}
          onChangeAction={() => setCurrentRegisterAction('code')}
        />
      ) : (
        <CodeForm title="Введите код:" userId={userId} onChangeTab={onChangeTab} />
      )}
    </>
  );
};
