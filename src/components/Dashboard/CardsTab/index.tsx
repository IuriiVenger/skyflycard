import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import CardDetail from './CardDetail';
import CardsList from './CardsList';

import { API } from '@/api/types';
import Loader from '@/components/Loader';
import { CardsTabMode, RequestStatus } from '@/constants';
import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { StoreDataWithStatus, StoreDataWithStatusAndMeta } from '@/store/types';

type CardsTabProps = {
  className?: string;
  cards: StoreDataWithStatus<API.Cards.CardDetailItem[] | null>;
  selectedCard: StoreDataWithStatus<API.Cards.CardDetailItem | null>;
  getSensitiveData: (card_id: string) => Promise<API.Cards.SensitiveData>;
  activeCardId: string | null;
  changeActiveCard: (card_id: string | null) => void;
  cardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null>;
  loadMoreCardTransactions: () => void;
  updateCard: (card_id: string, data: API.Cards.Request) => Promise<void>;
  selectedFiat: API.List.Fiat;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectCard: (card_id: string) => void;
  selectedCrypto: API.List.Crypto;
  selectCrypto: (crypto: API.List.Crypto) => void;
  fiatList: API.List.Fiat[];
  cryptoList: API.List.Crypto[];
  chainList: API.List.Chains[];
  selectedWallet: API.Wallets.Wallet | null;
  createInternalTopUpOrder: (requestData: API.Orders.VCards.Topup.Internal.Request) => Promise<void | null>;
  externalCalcData: UseExternalCalcData;
};

type ActiveCardMode = {
  [key in keyof typeof CardsTabMode]: boolean;
};

const CardsTab: FC<CardsTabProps> = (props) => {
  const { className, cards, selectedCard, activeCardId, changeActiveCard } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const cardTabMode = activeCardId ? CardsTabMode.CARD_DETAIL : CardsTabMode.LIST;

  const activeCardMode: ActiveCardMode = Object.entries(CardsTabMode).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value === cardTabMode }),
    {} as ActiveCardMode,
  );

  const isPending = cards.status === RequestStatus.PENDING || selectedCard.status === RequestStatus.PENDING;

  const setActiveCard = (card_id: string | null) => {
    changeActiveCard(card_id);
  };

  useEffect(() => {
    if (containerRef.current && !isPending && !isVisible) {
      const htmlElement = document.documentElement;
      const originalScrollBehavior = htmlElement.style.scrollBehavior;
      htmlElement.style.scrollBehavior = 'auto';
      containerRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
      htmlElement.style.scrollBehavior = originalScrollBehavior;
    }
  }, [isPending]);

  return (
    <section className={cn(className, 'min-h-44 scroll-mt-24')} ref={containerRef}>
      <VisibilitySensor onChange={setIsVisible}>
        <div className="h-1 w-1" />
      </VisibilitySensor>
      {isPending ? (
        <Loader />
      ) : (
        <>
          {activeCardMode.LIST && <CardsList onCardClick={setActiveCard} {...props} />}
          {activeCardMode.CARD_DETAIL && selectedCard.data && (
            <CardDetail card={selectedCard.data} setCardTabMode={() => setActiveCard(null)} {...props} />
          )}
        </>
      )}
    </section>
  );
};

export default CardsTab;
