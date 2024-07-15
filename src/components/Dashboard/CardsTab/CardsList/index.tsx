import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useState } from 'react';
import Cards from 'react-credit-cards';

import { GoPlusCircle } from 'react-icons/go';

import { CardsTabProps } from '..';

import CreateCardModal from '../CreateCardModal';

import Loader from '@/components/Loader';
import { KYCStatuses, RequestStatus } from '@/constants';
import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { deleteDash } from '@/utils/converters';

export type CardsListProps = CardsTabProps & {
  onCardClick: (card_id: string) => void;
  externalCalcData: UseExternalCalcData;
};

const CardsList: FC<CardsListProps> = (props) => {
  const { cards, onCardClick, loadSelectedWalletCards, loadMoreCards, openKYC, verificationStatus } = props;
  const { data, status, meta } = cards;
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);

  const isRequestPending = status === RequestStatus.PENDING;
  const isFirstItemsLoading = isRequestPending && !data?.length;
  const isLoadMoreAvailible = !meta.isLastPage;

  const openCreateCardModal = () => {
    setIsCreateCardModalOpen(true);
  };

  const createCardButtonClickHandler = () => {
    verificationStatus === KYCStatuses.APPROVED ? openCreateCardModal() : openKYC();
  };

  const onCardCreate = (card_id: string) => {
    onCardClick(card_id);
    loadSelectedWalletCards();
  };

  return (
    <section className="flex w-full flex-col">
      <h3 className="l mb-4 text-xl font-bold">Wallet cards</h3>
      <div className="dashboard-cards-tab grid grid-cols-2 gap-3 py-2 sm:gap-4 md:mt-6 lg:grid-cols-3">
        <button
          type="button"
          onClick={createCardButtonClickHandler}
          className="rccs__card flex h-full w-full cursor-pointer flex-col items-center justify-center border border-tenant-main bg-light-lavander-gradient transition-all hover:scale-[102%]"
        >
          <GoPlusCircle className="text-xl text-tenant-main xs:text-2xl" />
          <p className="text-sm text-tenant-main xs:text-base">Add new card</p>
        </button>
        {!isFirstItemsLoading && data ? (
          <>
            {data.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => onCardClick(card.id)}
                className={cn(
                  'cursor-pointer transition-all hover:scale-[103%]',
                  card.status !== 'ACTIVE' && 'grayscale',
                )}
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
          </>
        ) : (
          <Loader />
        )}
      </div>
      {isLoadMoreAvailible && (
        <Button
          color="primary"
          variant="bordered"
          radius="sm"
          className="mt-4 w-full max-w-32 self-center "
          onClick={loadMoreCards}
          isLoading={isRequestPending}
        >
          Load more
        </Button>
      )}
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
