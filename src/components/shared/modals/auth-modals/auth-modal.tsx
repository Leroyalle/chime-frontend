'use client';
import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
import { AuthTabs } from './auth-tabs';
import Cookies from 'js-cookie';
import { TokensEnum } from '@/types';

export const AuthModal: React.FC = () => {
  useEffect(() => {
    Cookies.remove(TokensEnum.JWT);
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
