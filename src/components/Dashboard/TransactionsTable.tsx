import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { FC } from 'react';

import Loader from '../Loader';

import { API } from '@/api/types';
import { RequestStatus } from '@/constants';
import { StoreDataWithStatusAndMeta } from '@/store/types';
import { getDate } from '@/utils/converters';

type TransactionsProps = {
  transactions: StoreDataWithStatusAndMeta<API.Transactions.Transaction[] | null>;
  loadMoreTransactions: () => void;
};

const Transactions: FC<TransactionsProps> = (props) => {
  const { transactions, loadMoreTransactions } = props;
  const { data, status, meta } = transactions;

  const isTransactionsLoading = status === RequestStatus.PENDING;
  const isFirstTransactionsLoading = isTransactionsLoading && !data?.length;
  const isLoadMoreAvailible = !meta.isLastPage;

  return (
    <section className="flex flex-col md:mt-6">
      <h3 className="mb-4 text-xl font-bold">Transactions</h3>
      {!isFirstTransactionsLoading && data ? (
        <>
          <Table removeWrapper aria-label="Wallet transactions" className="overflow-scroll">
            <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>Type</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Transaction ID</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No transactions to display.">
              {data.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{getDate(transaction.created_at)}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>
                    {transaction.amount} {transaction.crypto?.symbol}
                  </TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>{transaction.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isLoadMoreAvailible && (
            <Button
              color="primary"
              variant="bordered"
              radius="sm"
              className="mt-4 w-full max-w-32 self-center "
              onClick={loadMoreTransactions}
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

export default Transactions;
