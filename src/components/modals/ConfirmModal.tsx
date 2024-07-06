import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

import { framerMotionAnimations } from '@/config/animations';

type ConfirmModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  onConfirm: () => any;
  isOpen: boolean;
  title?: string | null;
  confirmText?: string | null;
};

const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { setIsModalOpen, onConfirm, isOpen, title, confirmText } = props;

  const [isConfirmationPending, setIsConfirmationPending] = useState(false);

  const [delay, setDelay] = useState(5);

  const handleClose = () => setIsModalOpen(false);

  const handleConfirmModal = async () => {
    try {
      setIsConfirmationPending(true);
      await onConfirm();
      handleClose();
    } finally {
      setIsConfirmationPending(false);
    }
  };

  const modalTitle = title || 'Confirmation';
  const modalConfirmText = confirmText || 'Are you sure you want to proceed?';

  useEffect(() => {
    isOpen && delay > 0 && setTimeout(() => setDelay(delay - 1), 1000);
  }, [delay, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setDelay(5);
    }
  }, [isOpen]);

  return (
    <Modal
      motionProps={{
        variants: framerMotionAnimations.downEnterExit,
      }}
      isOpen={isOpen}
      onOpenChange={setIsModalOpen}
    >
      <ModalContent>
        <ModalHeader>
          <p>{modalTitle}</p>
        </ModalHeader>
        <ModalBody>
          <p>{modalConfirmText}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            isDisabled={!!delay}
            className="text-white"
            color="primary"
            isLoading={isConfirmationPending}
            onClick={handleConfirmModal}
          >
            Confirm {!!delay && `(${delay})`}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
