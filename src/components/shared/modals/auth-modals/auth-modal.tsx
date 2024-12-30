'use client';
import React from 'react';
import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
import { AuthTabs } from './auth-tabs';

export const AuthModal: React.FC = () => {
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
