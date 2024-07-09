import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

import { framerMotionAnimations } from '@/config/animations';
import { useRequestStatus } from '@/hooks/useRequestStatus';

type ConfirmModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  onConfirm: () => any;
  isOpen: boolean;
  title?: string | null;
  confirmText?: string | null;
};

const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { setIsModalOpen, onConfirm, isOpen, title, confirmText } = props;

  const [requestStatuses, setPending, setFullfilled, setRejected] = useRequestStatus();
  const [lastRequestStatus, _, setLastRequestFullfilled, setLastRequestRejected] = useRequestStatus();

  const [delay, setDelay] = useState(5);

  const handleClose = () => setIsModalOpen(false);

  const handleConfirmModal = async () => {
    try {
      setPending();
      await onConfirm();
      handleClose();
      setFullfilled();
      setLastRequestFullfilled();
    } catch (error) {
      setRejected();
      setLastRequestRejected();
      throw error;
    }
  };

  const modalTitle = title || 'Confirmation';
  const modalConfirmText = confirmText || 'Are you sure you want to proceed?';
  const confirmButtonText = `${lastRequestStatus.REJECTED ? 'Try again' : 'Confirm'} ${delay ? ` (${delay})` : ''}`;

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
            color={lastRequestStatus.REJECTED ? 'danger' : 'primary'}
            isLoading={requestStatuses.PENDING}
            onClick={handleConfirmModal}
          >
            {confirmButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
