import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useState } from 'react';
import Cards from 'react-credit-cards';

import { isIOS, isAndroid } from 'react-device-detect';
import { FaCircleCheck, FaEye, FaMoneyBillTrendUp } from 'react-icons/fa6';
import { IoIosArrowRoundBack } from 'react-icons/io';

import { MdCurrencyExchange } from 'react-icons/md';

import { PiListThin } from 'react-icons/pi';

import { CardsTabProps } from '..';

import AddToWalletModal from './AddToWalletModal';
import CardLimitsModal from './CardLimitsModal';
import CardSensitiveDataModal from './CardSensitiveDataModal';

import CardTopupModal from './CardTopupModal';
import CardTransactionTable from './CardTransactionTable';

import { API } from '@/api/types';
import addToAppleWalletImg from '@/assets/svg/add-to-apple-wallet.svg';
import addToGoogleWalletImg from '@/assets/svg/add-to-google-wallet.svg';
import { CardsTabMode } from '@/constants';
import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { useRequestsStatus } from '@/hooks/useRequestStatus';
import { StoreDataWithStatusAndMeta } from '@/store/types';
import { deleteDash } from '@/utils/converters';

export type CardDetailProps = CardsTabProps & {
  card: API.Cards.CardDetailItem;
  cardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null>;
  setCardTabMode: (mode: CardsTabMode) => void;
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
  const [isAddToWalletModalOpen, setIsAddToWalletModalOpen] = useState(false);

  const [requestStatuses, setPending, setFullfilled, setRejected] = useRequestsStatus(
    Object.values(cardDetailRequests),
  );

  const cardTitle = `${card.bin.provider}, ${card.bin.currencyCode}`;
  const isActive = card.status === 'ACTIVE';
  const isMobileWalletDevice = isIOS || isAndroid;

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

  const showAddToWalletModal = () => {
    setIsAddToWalletModalOpen(true);
  };

  return (
    <section className="dashboard-card-detail flex w-full flex-col gap-4">
      <button type="button" onClick={backToCardsList} className="flex items-center gap-2 text-neutral-500">
        <IoIosArrowRoundBack /> Back to cards list
      </button>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className=" text-xl text-black lg:text-2xl">{cardTitle}</h3>
          <div className="flex items-center gap-1">
            <FaCircleCheck className={cn(isActive ? 'text-green-600' : 'text-neutral-500', 'text-sm lg:text-base')} />
            <small>{isActive ? 'Active' : 'Inactive'}</small>
          </div>
        </div>
      </div>
      <div className="mt-2 flex gap-4 xs:gap-8">
        <div className={cn(' w-[220px] xs:h-auto xs:w-auto', isMobileWalletDevice ? 'h-[185px]' : 'h-[165px]')}>
          <div className="flex origin-top-left scale-[85%] flex-col gap-4 xs:scale-100 ">
            <button type="button" className={cn(!isActive && 'grayscale')} onClick={showSensitiveDataModal}>
              <Cards
                name={card.cardName}
                issuer={card.bin.provider}
                number={deleteDash(card.maskedPan)}
                expiry={'**/**'}
                cvc="***"
                preview
              />
            </button>
            {isMobileWalletDevice && (
              <button type="button" onClick={showAddToWalletModal}>
                {isIOS && <img src={addToAppleWalletImg.src} className="max-w-[260px]" alt="ios" />}
                {isAndroid && <img src={addToGoogleWalletImg.src} className="max-w-[260px]" alt="android" />}
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col text-neutral-500">
            <p>Balance:</p>
            <p className="text-lg font-medium text-black lg:text-2xl">
              {card.balance.available} <small>{card.bin.currencyCode}</small>
            </p>
            <p className="mt-1 xs:mt-3">Blocked:</p>
            <p className="text-lg lg:text-2xl">
              {card.balance.pending} <small>{card.bin.currencyCode}</small>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-4">
        <Button
          color="primary"
          variant="flat"
          className=" bg-tenant-main-light text-tenant-main"
          isLoading={requestStatuses[cardDetailRequests.SENSITIVE_DATA].PENDING}
          onClick={showSensitiveDataModal}
          radius="sm"
        >
          <FaEye /> View details
        </Button>
        <Button
          color="primary"
          variant="flat"
          className=" bg-tenant-main-light text-tenant-main"
          onClick={showTopupModal}
          radius="sm"
          isLoading={requestStatuses[cardDetailRequests.TOP_UP].PENDING}
        >
          <MdCurrencyExchange />
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
          <FaMoneyBillTrendUp />
          Change limits
        </Button>
        <Button
          color="primary"
          className="cursor-not-allowed bg-tenant-main-light  text-tenant-main opacity-35 hover:!opacity-35"
          onClick={showSensitiveDataModal}
          radius="sm"
          disabled
        >
          <PiListThin />
          Other
        </Button>
      </div>

      <CardTransactionTable className="mt-2" {...props} />

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
      <AddToWalletModal isOpen={isAddToWalletModalOpen} setIsModalOpen={setIsAddToWalletModalOpen} />
    </section>
  );
};

export default CardDetail;
