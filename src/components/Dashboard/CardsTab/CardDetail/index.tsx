import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useState } from 'react';
import Cards from 'react-credit-cards';

import { FaCircleCheck } from 'react-icons/fa6';
import { IoIosArrowRoundBack } from 'react-icons/io';

import CardLimitsModal from './CardLimitsModal';
import CardSensitiveDataModal from './CardSensitiveDataModal';

import CardTopupModal from './CardTopupModal';
import CardTransactionTable from './CardTransactionTable';

import { API } from '@/api/types';
import { CardsTabMode } from '@/constants';
import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { useRequestsStatus } from '@/hooks/useRequestStatus';
import { StoreDataWithStatusAndMeta } from '@/store/types';
import { deleteDash } from '@/utils/converters';

type CardDetailProps = {
  card: API.Cards.CardDetailItem;
  cardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null>;
  loadMoreCardTransactions: () => void;
  getSensitiveData: (card_id: string) => Promise<API.Cards.SensitiveData>;
  setCardTabMode: (mode: CardsTabMode) => void;
  selectCard: (card_id: string) => void;
  updateCard: (card_id: string, data: API.Cards.Request) => Promise<void>;
  selectedFiat: API.List.Fiat;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectedCrypto: API.List.Crypto;
  selectCrypto: (crypto: API.List.Crypto) => void;
  fiatList: API.List.Fiat[];
  cryptoList: API.List.Crypto[];
  chainList: API.List.Chains[];
  selectedWallet: API.Wallets.Wallet | null;
  createInternalTopUpOrder: (requestData: API.Orders.VCards.Topup.Internal.Request) => Promise<void | null>;
  externalCalcData: UseExternalCalcData;
};

const cardDetailRequests = {
  SENSITIVE_DATA: 'sensitiveData',
  LIMITS: 'limits',
  TOP_UP: 'topUp',
};

const CardDetail: FC<CardDetailProps> = (props) => {
  const { card, setCardTabMode, getSensitiveData } = props;

  const [sensitiveData, setSensitiveData] = useState<API.Cards.SensitiveData | null>(null);
  const [isSensitiveDataModalOpen, setIsSensitiveDataModalOpen] = useState(false);
  const [isLimitsModalOpen, setIsLimitsModalOpen] = useState(false);
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);

  const [requestStatuses, setPending, setFullfilled, setRejected] = useRequestsStatus(
    Object.values(cardDetailRequests),
  );

  const cardTitle = `${card.bin.provider}, ${card.bin.currencyCode}`;
  const isActive = card.status === 'active';

  const backToCardsList = () => {
    setCardTabMode(CardsTabMode.LIST);
  };

  const loadSensitiveData = async (card_id: string) => {
    const newSensitiveData = await getSensitiveData(card_id);
    setSensitiveData(newSensitiveData);
  };

  const showSensitiveDataModal = async () => {
    try {
      setPending(cardDetailRequests.SENSITIVE_DATA);
      await loadSensitiveData(card.id);
      setFullfilled(cardDetailRequests.SENSITIVE_DATA);
      setIsSensitiveDataModalOpen(true);
    } catch (error) {
      setRejected(cardDetailRequests.SENSITIVE_DATA);
      throw error;
    }
  };

  const showLimitsModal = () => {
    setIsLimitsModalOpen(true);
  };

  const showTopupModal = async () => {
    try {
      setPending(cardDetailRequests.TOP_UP);
      await loadSensitiveData(card.id);
      setFullfilled(cardDetailRequests.TOP_UP);
      setIsTopupModalOpen(true);
    } catch (error) {
      setRejected(cardDetailRequests.TOP_UP);
      throw error;
    }
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
          className=" h-[85px] w-[130px] origin-top-left scale-50 px-1 xs:h-[128px] xs:w-[195px] xs:scale-75 lg:h-auto lg:w-auto  lg:scale-100"
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
          isLoading={requestStatuses[cardDetailRequests.SENSITIVE_DATA].PENDING}
          onClick={showSensitiveDataModal}
          radius="sm"
        >
          View details
        </Button>
        <Button
          color="primary"
          variant="flat"
          className=" bg-tenant-main-light text-tenant-main"
          onClick={showTopupModal}
          radius="sm"
          isLoading={requestStatuses[cardDetailRequests.TOP_UP].PENDING}
        >
          Top up
        </Button>
        <Button
          color="primary"
          variant="flat"
          className=" bg-tenant-main-light text-tenant-main"
          isLoading={requestStatuses[cardDetailRequests.LIMITS].PENDING}
          onClick={showLimitsModal}
          radius="sm"
        >
          Change limits
        </Button>
        <Button
          color="primary"
          variant="flat"
          className=" bg-tenant-main-light text-tenant-main"
          onClick={showSensitiveDataModal}
          radius="sm"
        >
          Other
        </Button>
      </div>

      <CardTransactionTable className="mt-4" {...props} />

      <CardSensitiveDataModal
        sensitiveData={sensitiveData}
        isOpen={isSensitiveDataModalOpen}
        setIsModalOpen={setIsSensitiveDataModalOpen}
      />
      <CardLimitsModal
        limits={card.limits}
        isOpen={isLimitsModalOpen}
        setIsModalOpen={setIsLimitsModalOpen}
        {...props}
      />
      <CardTopupModal
        sensitiveData={sensitiveData}
        isOpen={isTopupModalOpen}
        setIsModalOpen={setIsTopupModalOpen}
        {...props}
      />
    </section>
  );
};

export default CardDetail;
