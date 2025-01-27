'use client';
import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
import { AuthTabs } from './auth-tabs';
import Cookies from 'js-cookie';
import { TokensEnum } from '@/types';
import { QueryCache } from '@tanstack/react-query';

export const AuthModal: React.FC = () => {
  const queryCache = new QueryCache();

  useEffect(() => {
    Cookies.remove(TokensEnum.JWT);
    queryCache.clear();
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
