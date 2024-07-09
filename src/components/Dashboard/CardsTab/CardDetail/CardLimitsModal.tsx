import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { ChangeEvent, FC, useState } from 'react';

import { API } from '@/api/types';
import { framerMotionAnimations } from '@/config/animations';
import { useRequestStatus } from '@/hooks/useRequestStatus';

type CardLimitsModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  limits: API.Cards.Limits | null;
  isOpen: boolean;
  card: API.Cards.CardDetailItem;
  updateCard: (card_id: string, data: API.Cards.Update.Request) => Promise<void>;
};

const CardLimitsModal: FC<CardLimitsModalProps> = (props) => {
  const { setIsModalOpen, isOpen, limits, updateCard, card } = props;
  const [requestStatuses, setPending, setFullfilled, setRejected] = useRequestStatus();

  if (!limits) {
    return null;
  }

  const [modalLimits, setModalLimits] = useState<API.Cards.Limits>(limits);

  const isModalsLimitsEqual = JSON.stringify(modalLimits) === JSON.stringify(limits);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onOpenChange = (value: boolean) => {
    if (value) {
      setModalLimits(limits);
      setIsModalOpen(true);
      return;
    }
    closeModal();
  };

  const handleLimitChange = (key: keyof API.Cards.Limits) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newLimits = { ...modalLimits, [key]: { amount: Number(value), interval: limits[key].interval } };

    setModalLimits(newLimits);
  };

  const saveLimits = async () => {
    const newCardsData: API.Cards.Update.Request = { ...card, limits: modalLimits, cardName: 'Pupupu' };

    try {
      setPending();
      await updateCard(card.id, newCardsData);
      setFullfilled();
      closeModal();
    } catch (error) {
      setRejected();
      throw error;
    }
  };

  return (
    <Modal
      motionProps={{
        variants: framerMotionAnimations.downEnterExit,
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      backdrop="opaque"
    >
      <ModalContent>
        <ModalHeader>Card limits</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Single limit"
              onChange={handleLimitChange('single')}
              value={String(modalLimits.single.amount)}
              type="number"
            />

            <Input
              label="Daily limit"
              value={String(modalLimits.daily.amount)}
              onChange={handleLimitChange('daily')}
              type="number"
            />

            <Input
              label="Weekly limit"
              value={String(modalLimits.weekly.amount)}
              onChange={handleLimitChange('weekly')}
              type="number"
            />

            <Input
              label="Monthly limit"
              value={String(modalLimits.monthly.amount)}
              type="number"
              onChange={handleLimitChange('monthly')}
            />

            <Input
              label="Lifetime limit"
              className="col-span-2"
              value={String(modalLimits.lifetime.amount)}
              type="number"
              onChange={handleLimitChange('lifetime')}
            />
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col">
          <Button
            className="w-full"
            onClick={saveLimits}
            isLoading={requestStatuses.PENDING}
            color="primary"
            isDisabled={isModalsLimitsEqual}
          >
            Save
          </Button>
          <Button className="w-full" onClick={closeModal} color="primary" variant="bordered">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CardLimitsModal;
