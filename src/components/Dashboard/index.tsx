import { useQueryState } from 'nuqs';
import { FC, useEffect, useState } from 'react';
import { BsArrowDownLeft, BsArrowLeftRight, BsArrowUpRight } from 'react-icons/bs';

import { IoIosList } from 'react-icons/io';

import DepositForm from './DepositForm';
import MainInformation from './MainInformation';
import Transactions from './TransactionsTable';
import WithdrawForm from './WithdrawForm';

import { API } from '@/api/types';
import WalletBalanceList from '@/components/Wallet/WalletBalanceList';
import WalletList from '@/components/Wallet/WalletList';
import { DashboardTabs, KYCStatuses, WalletTypeValues } from '@/constants';
import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { StoreDataWithStatusAndMeta } from '@/store/types';
import { ValueWithLabel } from '@/types';
import { roundToDecimals } from '@/utils/converters';

type DashboardProps = {
  wallets: API.Wallets.Wallet[];
  walletTypes: ValueWithLabel[];
  getWalletAddress: (chain: number, wallet_uuid: string) => Promise<API.Wallets.WalletChain.Response>;
  createWalletAddress: (data: API.Wallets.WalletChain.Request) => Promise<API.Wallets.WalletChain.Response>;
  chainList: API.List.Chains[];
  cryptoList: API.List.Crypto[];
  availableToExchangeCrypto: API.List.Crypto[];
  fiatList: API.List.Fiat[];
  externalCalcData: UseExternalCalcData;
  selectChain: (chain: API.List.Chains) => void;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectCrypto: (crypto: API.List.Crypto) => void;
  selectWallet: (wallet_uuid: string) => void;
  selectedChain: API.List.Chains;
  selectedFiat: API.List.Fiat;
  selectedCrypto: API.List.Crypto;
  selectedWallet: API.Wallets.ExtendWallet | null;
  exchangeRate: API.Exchange.F2C[];
  createWallet: (wallet_type: WalletTypeValues) => Promise<void>;
  createFiat2CryptoOrder: (requestData: API.Orders.OnRamp.Request) => Promise<void | null>;
  createCrypto2FiatOrder: (requestData: API.Orders.OffRamp.Request) => Promise<void | null>;
  createCrypto2CryptoOrder: (requestData: API.Orders.Crypto.Withdrawal.Request) => Promise<void | null>;
  transactions: StoreDataWithStatusAndMeta<API.Transactions.Transaction[] | null>;
  loadMoreTransactions: () => void;
  verificationStatus?: KYCStatuses;
  openKYC: () => void;
};

const Dashboard: FC<DashboardProps> = (props) => {
  const [queryTab, setQueryTab] = useQueryState('tab');
  const initialTab = (queryTab as DashboardTabs) || DashboardTabs.DEPOSIT;

  const {
    wallets,
    selectWallet,
    selectedWallet,
    cryptoList,
    createWallet,
    walletTypes,
    chainList,
    verificationStatus,
    openKYC,
  } = props;
  const currentWalletBalance = roundToDecimals(selectedWallet?.total_amount || 0);
  const [activeTab, setActiveTab] = useState<DashboardTabs>(initialTab);

  const actionButtons = [
    {
      id: DashboardTabs.DEPOSIT,
      title: 'Deposit',
      icon: BsArrowDownLeft,
      onClick: () => {
        setQueryTab(DashboardTabs.DEPOSIT);
        setActiveTab(DashboardTabs.DEPOSIT);
      },
    },
    {
      id: DashboardTabs.WITHDRAW,
      title: 'Withdraw',
      icon: BsArrowUpRight,
      onClick: () => {
        setQueryTab(DashboardTabs.WITHDRAW);
        setActiveTab(DashboardTabs.WITHDRAW);
      },
    },
    {
      id: DashboardTabs.TRANSACTIONS,
      title: 'Transactions',
      icon: IoIosList,
      onClick: () => {
        setQueryTab(DashboardTabs.TRANSACTIONS);
        setActiveTab(DashboardTabs.TRANSACTIONS);
      },
    },
    {
      id: DashboardTabs.EXCHANGE,
      title: 'Exchange',
      icon: BsArrowLeftRight,
      onClick: () => {
        setQueryTab(DashboardTabs.EXCHANGE);
        setActiveTab(DashboardTabs.EXCHANGE);
      },
      disabled: true,
    },
  ];

  useEffect(() => {
    queryTab && setActiveTab(queryTab as DashboardTabs);
  }, [queryTab]);

  return (
    <section className="grid w-full max-w-screen-xl grid-cols-1 gap-x-12  gap-y-8 md:grid-cols-[280px,auto] md:gap-y-12 lg:gap-x-20 xl:gap-x-40">
      <aside className="row-start-1 row-end-6 flex w-full flex-shrink-0 flex-col justify-between gap-8 sm:flex-row  md:max-w-xs md:flex-col md:justify-start md:pt-6">
        <WalletList
          createWallet={createWallet}
          wallets={wallets}
          onSelect={selectWallet}
          activeWallet={selectedWallet}
          walletTypes={walletTypes}
        />
        <WalletBalanceList chains={chainList} wallet={selectedWallet} cryptoList={cryptoList} />
      </aside>

      <MainInformation
        className="order-2 md:col-start-2 md:col-end-4"
        balance={currentWalletBalance}
        actionButtons={actionButtons}
        activeTab={activeTab}
        verificationStatus={verificationStatus}
        openKYC={openKYC}
      />
      <div className="order-3 mt-4 overflow-scroll md:col-start-2 md:col-end-4">
        {activeTab === DashboardTabs.DEPOSIT && <DepositForm {...props} />}
        {activeTab === DashboardTabs.WITHDRAW && <WithdrawForm {...props} />}
        {activeTab === DashboardTabs.TRANSACTIONS && <Transactions {...props} />}
        {activeTab === DashboardTabs.EXCHANGE && <div>Exchange</div>}
      </div>
    </section>
  );
};

export default Dashboard;
