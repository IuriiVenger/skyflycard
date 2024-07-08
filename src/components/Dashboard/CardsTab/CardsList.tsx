import { FC } from 'react';
import Cards from 'react-credit-cards';

import { GoPlusCircle } from 'react-icons/go';

import { API } from '@/api/types';
import { StoreDataWithStatus } from '@/store/types';
import { deleteDash } from '@/utils/converters';

type CardsListProps = {
  cards: StoreDataWithStatus<API.Cards.CardDetailItem[] | null>;
  onCardClick: (card_id: string) => void;
};

const CardsList: FC<CardsListProps> = ({ cards, onCardClick }) => (
  <section>
    <h3 className="mb-4 text-xl font-bold">Cards list</h3>
    <div className="dashboard-cards-tab grid grid-cols-2 gap-3 py-2 sm:gap-4 md:mt-6 lg:grid-cols-3">
      {cards.data?.map((card) => (
        <button
          key={card.id}
          type="button"
          onClick={() => onCardClick(card.id)}
          className="cursor-pointer transition-all hover:scale-[103%]"
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
      ))}
      <div className="rccs__card flex h-full w-full cursor-pointer flex-col items-center justify-center border border-tenant-main bg-light-lavander-gradient transition-all hover:scale-[102%]">
        <GoPlusCircle className="text-xl text-tenant-main lg:text-4xl" />
        <p className="text-sm text-tenant-main lg:text-base">Add new card</p>
      </div>
    </div>
  </section>
);

export default CardsList;
