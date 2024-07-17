import { Button } from '@nextui-org/react';
import { ChangeEvent, FC, useState } from 'react';

import { API } from '@/api/types';
import CustomInput from '@/components/ui/CustomInput';
import CustomModal from '@/components/ui/CustomModal';
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
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      header="Card limits"
      footer={
        <div className="flex flex-col gap-3">
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
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        <CustomInput
          content="width=device-width, initial-scale=1, maximum-scale=1"
          label="Single limit"
          onChange={handleLimitChange('single')}
          value={String(modalLimits.single.amount)}
          type="number"
        />

        <CustomInput
          content="width=device-width, initial-scale=1, maximum-scale=1"
          label="Daily limit"
          value={String(modalLimits.daily.amount)}
          onChange={handleLimitChange('daily')}
          type="number"
        />

        <CustomInput
          content="width=device-width, initial-scale=1, maximum-scale=1"
          label="Weekly limit"
          value={String(modalLimits.weekly.amount)}
          onChange={handleLimitChange('weekly')}
          type="number"
        />

        <CustomInput
          content="width=device-width, initial-scale=1, maximum-scale=1"
          label="Monthly limit"
          value={String(modalLimits.monthly.amount)}
          type="number"
          onChange={handleLimitChange('monthly')}
        />

        <CustomInput
          content="width=device-width, initial-scale=1, maximum-scale=1"
          label="Lifetime limit"
          className="col-span-2"
          value={String(modalLimits.lifetime.amount)}
          type="number"
          onChange={handleLimitChange('lifetime')}
        />
      </div>
    </CustomModal>
  );
};

export default CardLimitsModal;
