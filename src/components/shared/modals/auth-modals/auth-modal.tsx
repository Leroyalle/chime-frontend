'use client';
import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
import { AuthTabs } from './auth-tabs';
import Cookies from 'js-cookie';
import { TokensEnum } from '@/types';
import { useQueryClient } from '@tanstack/react-query';

export const AuthModal: React.FC = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    Cookies.remove(TokensEnum.JWT);
    queryClient.removeQueries();
  }, []);

  return (
    <Modal isOpen placement="center" hideCloseButton>
      <ModalContent className="py-4">
        <ModalBody>
          <AuthTabs />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
