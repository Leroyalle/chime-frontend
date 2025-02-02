'use client';
import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
import { AuthTabs } from './auth-tabs';
import Cookies from 'js-cookie';
import { TokensEnum } from '@/types';
import { QueryClient } from '@tanstack/react-query';

export const AuthModal: React.FC = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    Cookies.remove(TokensEnum.JWT);
    queryClient.clear();
  }, []);

  return (
    <Modal isOpen placement="top-center" hideCloseButton>
      <ModalContent className="py-4">
        <ModalBody>
          <AuthTabs />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
