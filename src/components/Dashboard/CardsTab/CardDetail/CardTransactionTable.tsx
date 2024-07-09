import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';

import { FaArrowRightArrowLeft, FaCircleCheck, FaCircleXmark, FaClock } from 'react-icons/fa6';

import { API } from '@/api/types';
import Loader from '@/components/Loader';
import { CardTransactionDirection, CardTransationStatus, RequestStatus } from '@/constants';
import { StoreDataWithStatusAndMeta } from '@/store/types';
import { getDate, getDateAndTime } from '@/utils/converters';

type CardTransactionTableProps = {
  className?: string;
  cardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null>;
  loadMoreCardTransactions: () => void;
};

const getCardTransactionStatusIcon = (transaction: API.Cards.TransactionItem) => {
  if (transaction.status === CardTransationStatus.SUCCESS) {
    return <FaCircleCheck />;
  }

  if (transaction.status === CardTransationStatus.DECLINE) {
    return <FaCircleXmark />;
  }

  if (transaction.status === CardTransationStatus.PENDING) {
    return <FaClock />;
  }

  return <FaArrowRightArrowLeft />;
};

const getTransactionDirectionSymbol = (type: CardTransactionDirection) => {
  switch (type) {
    case CardTransactionDirection.INCOMING:
      return '-';
    case CardTransactionDirection.OUTGOING:
      return '+';
    default:
      return '';
  }
};

const getTransactionDirectionColor = (transaction: API.Cards.TransactionItem) => {
  if (
    transaction.direction === CardTransactionDirection.OUTGOING &&
    transaction.status === CardTransationStatus.SUCCESS
  ) {
    return 'text-green-500';
  }
  if (transaction.status === CardTransationStatus.DECLINE) {
    return 'text-red-500';
  }
  return null;
};

const getTransactionData = (transaction: API.Cards.TransactionItem) => {
  const transactionData = {
    transactionIcon: getCardTransactionStatusIcon(transaction),
    transactionColorClass: getTransactionDirectionColor(transaction),
    transactionSymbol: getTransactionDirectionSymbol(transaction.direction),
  };

  return transactionData;
};

const CardTransactionTable: FC<CardTransactionTableProps> = (props) => {
  const { cardTransactions, loadMoreCardTransactions, className } = props;

  const { data, meta, status } = cardTransactions;
  const isLoadMoreAvailible = !meta.isLastPage;
  const isTransactionsLoading = status === RequestStatus.PENDING;
  const isFirstTransactionsLoading = isTransactionsLoading && !data?.length;

  return (
    <section className={cn(className, 'flex flex-col gap-4')}>
      <h3 className="text-xl font-bold">Transactions</h3>
      {!isFirstTransactionsLoading && data ? (
        <>
          <Accordion>
            {data.map((transaction) => {
              const { transactionColorClass, transactionSymbol, transactionIcon } = getTransactionData(transaction);
              return (
                <AccordionItem
                  key={transaction.id}
                  isCompact
                  title={
                    <div className={cn(transactionColorClass, 'flex items-center gap-2 text-xl font-bold')}>
                      {transactionSymbol}
                      {transaction.amount} {transaction.currencyCode}
                    </div>
                  }
                  subtitle={
                    <p className="mt-2 flex items-center gap-1">
                      {getDate(transaction.createdAt)} {transactionIcon}
                    </p>
                  }
                >
                  <div className="pl-2">
                    <h4 className="font-meidum mb-4 text-sm">Transaction details</h4>
                    <div className="grid grid-cols-[1fr,4fr] gap-x-8 gap-y-2 px-2 pb-4 text-xs text-neutral-500">
                      <p>ID:</p>
                      <p>{transaction.id}</p>
                      <p>DATE:</p>
                      <p>{getDateAndTime(transaction.createdAt)}</p>
                      <p>TYPE:</p>
                      <p>{transaction.type}</p>
                      <p>STATUS:</p>
                      <p>{transaction.status}</p>
                      <p>DIRECTION:</p>
                      <p>{transaction.direction}</p>
                      <p>DESCRIPTION:</p>
                      <p>{transaction.description}</p>
                    </div>
                  </div>
                </AccordionItem>
              );
            })}
          </Accordion>

          {isLoadMoreAvailible && (
            <Button
              color="primary"
              variant="bordered"
              radius="sm"
              className="mt-4 w-full max-w-32 self-center "
              onClick={loadMoreCardTransactions}
              isLoading={isTransactionsLoading}
            >
              Load more
            </Button>
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default CardTransactionTable;
