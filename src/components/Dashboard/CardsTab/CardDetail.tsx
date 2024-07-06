import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useState } from 'react';
import Cards from 'react-credit-cards';

import { FaCircleCheck } from 'react-icons/fa6';
import { IoIosArrowRoundBack } from 'react-icons/io';

import CardSensitiveDataModal from './CardSensitiveDataModal';

import { API } from '@/api/types';
import { CardsTabMode } from '@/constants';
import useRequestStatus from '@/hooks/useRequestStatus';
import { deleteDash } from '@/utils/converters';

type CardDetailProps = {
  card: API.Cards.CardDetailItem;
  getSensitiveData: (card_id: string) => Promise<API.Cards.SensitiveData>;
  setCardTabMode: (mode: CardsTabMode) => void;
};

const CardDetail: FC<CardDetailProps> = ({ card, getSensitiveData, setCardTabMode }) => {
  const [sensitiveData, setSensitiveData] = useState<API.Cards.SensitiveData | null>(null);
  const [isSensitiveDataModalOpen, setIsSensitiveDataModalOpen] = useState(false);
  const [requestStatuses, setPending, setFullfilled, setRejected] = useRequestStatus();

  const cardTitle = `${card.bin.provider}, ${card.bin.currencyCode}`;
  const isActive = card.status === 'active';

  const backToCardsList = () => {
    setCardTabMode(CardsTabMode.LIST);
  };

  const loadSensitiveData = async (card_id: string) => {
    try {
      setPending();
      const data = await getSensitiveData(card_id);
      setSensitiveData(data);
      setFullfilled();
    } catch (error) {
      setRejected();
      throw error;
    }
  };

  const showSensitiveDataModal = async () => {
    await loadSensitiveData(card.id);
    setIsSensitiveDataModalOpen(true);
  };

  return (
    <section className="dashboard-card-detail flex flex-col gap-4">
      <button type="button" onClick={backToCardsList} className="flex items-center gap-2 text-neutral-500">
        <IoIosArrowRoundBack /> Back to cards list
      </button>
      <div className="flex items-center gap-2">
        <h3 className=" text-xl text-black lg:text-2xl">{cardTitle}</h3>
        <FaCircleCheck className={cn(isActive ? 'text-green-600' : 'text-neutral-500', 'text-sm lg:text-base')} />
      </div>
      <div className="mt-2 flex gap-8">
        <button
          type="button"
          className=" h-[85px] w-[130px] origin-top-left scale-50 xs:h-[128px] xs:w-[195px] xs:scale-75 lg:h-auto lg:w-auto lg:scale-100"
          onClick={showSensitiveDataModal}
        >
          <Cards
            name={card.cardName}
            issuer={card.bin.provider}
            number={deleteDash(card.maskedPan)}
            expiry={'**/**'}
            cvc="***"
            preview
          />
        </button>
        <div className="flex flex-col text-neutral-500">
          <p className="text-xs xs:text-base">Balance:</p>
          <p className="font-medium text-black lg:text-2xl">
            {card.balance.available} {card.bin.currencyCode}
          </p>
          <p className="mt-1 text-xs xs:mt-3 xs:text-base">Blocked:</p>
          <p className="lg:text-2xl">
            {card.balance.pending} {card.bin.currencyCode}
          </p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Button
          color="primary"
          variant="flat"
          className=" bg-tenant-main-light text-tenant-main"
          isLoading={requestStatuses.PENDING}
          onClick={showSensitiveDataModal}
          radius="sm"
        >
          View details
        </Button>
        <Button
          color="primary"
          variant="flat"
          className=" bg-tenant-main-light text-tenant-main"
          onClick={showSensitiveDataModal}
          radius="sm"
        >
          Top up
        </Button>
        <Button
          color="primary"
          variant="flat"
          className=" bg-tenant-main-light text-tenant-main"
          isLoading={requestStatuses.PENDING}
          onClick={showSensitiveDataModal}
          radius="sm"
        >
          Change limits
        </Button>
        <Button
          color="primary"
          variant="flat"
          className=" bg-tenant-main-light text-tenant-main"
          isLoading={requestStatuses.PENDING}
          onClick={showSensitiveDataModal}
          radius="sm"
        >
          Other
        </Button>
      </div>
      <CardSensitiveDataModal
        cardSensitiveData={sensitiveData}
        isOpen={isSensitiveDataModalOpen}
        setIsModalOpen={setIsSensitiveDataModalOpen}
      />
    </section>
  );
};

export default CardDetail;
