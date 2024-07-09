import cn from 'classnames';
import { FC, useState } from 'react';
import Cards from 'react-credit-cards';

import { GoPlusCircle } from 'react-icons/go';

import { CardsTabProps } from '..';

import CreateCardModal from './CreateCardModal';

import { API } from '@/api/types';
import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { deleteDash } from '@/utils/converters';

export type CardsListProps = CardsTabProps & {
  onCardClick: (card_id: string) => void;
  selectedWallet: API.Wallets.Wallet | null;
  externalCalcData: UseExternalCalcData;
};

const CardsList: FC<CardsListProps> = (props) => {
  const { cards, onCardClick, loadSelectedWalletCards } = props;
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);

  const openCreateCardModal = () => {
    setIsCreateCardModalOpen(true);
  };

  const onCardCreate = (card_id: string) => {
    onCardClick(card_id);
    loadSelectedWalletCards();
  };

  return (
    <section className="w-full">
      <h3 className="mb-4 text-xl font-bold">Wallet cards</h3>
      <div className="dashboard-cards-tab grid grid-cols-2 gap-3 py-2 sm:gap-4 md:mt-6 lg:grid-cols-3">
        <button
          type="button"
          onClick={openCreateCardModal}
          className="rccs__card flex h-full w-full cursor-pointer flex-col items-center justify-center border border-tenant-main bg-light-lavander-gradient transition-all hover:scale-[102%]"
        >
          <GoPlusCircle className="text-xl text-tenant-main xs:text-2xl" />
          <p className="text-sm text-tenant-main xs:text-base">Add new card</p>
        </button>
        {cards.data?.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onCardClick(card.id)}
            className={cn('cursor-pointer transition-all hover:scale-[103%]', card.status !== 'ACTIVE' && 'grayscale')}
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
      </div>
      <CreateCardModal
        isOpen={isCreateCardModalOpen}
        setIsModalOpen={setIsCreateCardModalOpen}
        onCardCreate={onCardCreate}
        {...props}
      />
    </section>
  );
};

export default CardsList;
