import {
  Accordion,
  AccordionItem,
  Button,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { FC, useState } from 'react';

import Loader from '../Loader';

import WalletBalanceList from '../Wallet/WalletBalanceList';

import { API } from '@/api/types';
import { RequestStatus } from '@/constants';
import { StoreDataWithStatusAndMeta } from '@/store/types';
import { getDate } from '@/utils/converters';

type TransactionsProps = {
  transactions: StoreDataWithStatusAndMeta<API.Transactions.Transaction[] | null>;
  loadMoreTransactions: () => void;
  selectedWallet: API.Wallets.ExtendWallet | null;
  cryptoList: API.List.Crypto[];
  chainList: API.List.Chains[];
};

const Transactions: FC<TransactionsProps> = (props) => {
  const { transactions, loadMoreTransactions, chainList, selectedWallet, cryptoList } = props;
  const { data, status, meta } = transactions;

  const [balanceAccordinState, setBalanceAccordionState] = useState<Selection>(new Set(['1']));

  const isBalanceAccordionOpen = (balanceAccordinState as Set<string>).has('1');

  const isTransactionsLoading = status === RequestStatus.PENDING;
  const isFirstTransactionsLoading = isTransactionsLoading && !data?.length;
  const isLoadMoreAvailible = !meta.isLastPage;

  return (
    <section className="flex flex-col md:mt-6">
      <Accordion
        selectedKeys={balanceAccordinState}
        onSelectionChange={setBalanceAccordionState}
        fullWidth
        className="-mt-4 mb-4 pl-0 pr-3 md:hidden"
      >
        <AccordionItem
          key={1}
          subtitle={isBalanceAccordionOpen ? 'Tap to collapse' : 'Tap to expand'}
          className="p-0"
          title={<h3 className="text-xl font-bold">Wallet crypto balance</h3>}
        >
          <WalletBalanceList chains={chainList} wallet={selectedWallet} cryptoList={cryptoList} />
        </AccordionItem>
      </Accordion>
      <h3 className="mb-4 text-xl font-bold">Transactions</h3>
      {!isFirstTransactionsLoading && data ? (
        <>
          <Table removeWrapper aria-label="Wallet transactions" className="overflow-scroll">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Type</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No transactions to display.">
              {data.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{getDate(transaction.created_at)}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {transaction.amount} {transaction.crypto?.symbol}
                  </TableCell>
                  <TableCell>{transaction.status}</TableCell>
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
