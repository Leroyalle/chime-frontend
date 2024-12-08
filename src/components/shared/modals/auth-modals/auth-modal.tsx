'use client';
import React from 'react';
import { Button, ModalFooter, Modal, ModalContent, ModalBody } from '@nextui-org/react';
import { AuthTabs } from './auth-tabs';

export const AuthModal: React.FC = () => {
  return (
    <>
      <Modal isOpen placement="top-center" hideCloseButton>
        <ModalContent className="py-4">
          {(onClose) => (
            <>
              <ModalBody>
                <AuthTabs />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
