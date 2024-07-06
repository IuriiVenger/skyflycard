import { FC } from 'react';

import CardDetail from './CardDetail';
import CardsList from './CardsList';

import { API } from '@/api/types';
import Loader from '@/components/Loader';
import { CardsTabMode, RequestStatus } from '@/constants';
import { StoreDataWithStatus } from '@/store/types';

type CardsTabProps = {
  className?: string;
  cards: StoreDataWithStatus<API.Cards.CardDetailItem[] | null>;
  selectedCard: StoreDataWithStatus<API.Cards.CardDetailItem | null>;
  getSensitiveData: (card_id: string) => Promise<API.Cards.SensitiveData>;
  activeCardId: string | null;
  changeActiveCard: (card_id: string | null) => void;
};

type ActiveCardMode = {
  [key in keyof typeof CardsTabMode]: boolean;
};

const CardsTab: FC<CardsTabProps> = (props) => {
  const { className, cards, selectedCard, getSensitiveData, activeCardId, changeActiveCard } = props;

  const cardTabMode = activeCardId ? CardsTabMode.CARD_DETAIL : CardsTabMode.LIST;

  const activeCardMode: ActiveCardMode = Object.entries(CardsTabMode).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value === cardTabMode }),
    {} as ActiveCardMode,
  );

  const isPending = cards.status === RequestStatus.PENDING || selectedCard.status === RequestStatus.PENDING;

  const setActiveCard = (card_id: string | null) => {
    changeActiveCard(card_id);
  };

  if (isPending) {
    return (
      <div className="flex min-h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <section className={className}>
      {activeCardMode.LIST && <CardsList cards={cards} onCardClick={setActiveCard} />}
      {activeCardMode.CARD_DETAIL && selectedCard.data && (
        <CardDetail
          card={selectedCard.data}
          getSensitiveData={getSensitiveData}
          setCardTabMode={() => setActiveCard(null)}
        />
      )}
    </section>
  );
};

export default CardsTab;
