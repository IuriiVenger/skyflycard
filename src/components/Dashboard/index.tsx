import { FC } from 'react';
import { BsArrowDownLeft, BsArrowUpRight, BsCreditCard2Back } from 'react-icons/bs';

import { IoIosList } from 'react-icons/io';

import CardsTab from './CardsTab';
import DepositForm from './DepositTab';
import MainInformation from './MainInformation';
import Transactions from './TransactionsTab';
import WithdrawForm from './WithdrawTab';

import { API } from '@/api/types';
import WalletBalanceList from '@/components/Wallet/WalletBalanceList';
import WalletList from '@/components/Wallet/WalletList';
import { DashboardTabs, KYCStatuses, WalletTypeValues } from '@/constants';
import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { StoreDataWithStatus, StoreDataWithStatusAndMeta } from '@/store/types';
import { ValueWithLabel } from '@/types';
import { roundToDecimals } from '@/utils/converters';

export type DashboardProps = {
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
  selectCard: (card_id: string) => void;
  selectedChain: API.List.Chains;
  selectedCard: StoreDataWithStatus<API.Cards.CardDetailItem | null>;
  selectedFiat: API.List.Fiat;
  selectedCrypto: API.List.Crypto;
  selectedWallet: API.Wallets.ExtendWallet | null;
  exchangeRate: API.Exchange.F2C[];
  createWallet: (wallet_type: WalletTypeValues) => Promise<void>;
  createFiat2CryptoOrder: (requestData: API.Orders.OnRamp.Request) => Promise<void | null>;
  createCrypto2FiatOrder: (requestData: API.Orders.OffRamp.Request) => Promise<void | null>;
  createCrypto2CryptoOrder: (requestData: API.Orders.Crypto.Withdrawal.Request) => Promise<void | null>;
  transactions: StoreDataWithStatusAndMeta<API.Transactions.Transaction[] | null>;
  cards: StoreDataWithStatus<API.Cards.CardDetailItem[] | null>;
  loadMoreTransactions: () => void;
  verificationStatus?: KYCStatuses;
  openKYC: () => void;
  activeDashboardTab: DashboardTabs;
  changeDashboardTab: (tab: DashboardTabs) => void;
  getSensitiveData: (card_id: string) => Promise<API.Cards.SensitiveData>;
  changeActiveCard: (card_id: string | null) => void;
  activeCardId: string | null;
};

const Dashboard: FC<DashboardProps> = (props) => {
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
    activeDashboardTab,
    changeDashboardTab,
  } = props;
  const currentWalletBalance = roundToDecimals(selectedWallet?.total_amount || 0);

  const actionButtons = [
    {
      id: DashboardTabs.TRANSACTIONS,
      title: 'Transactions',
      icon: IoIosList,
      onClick: () => changeDashboardTab(DashboardTabs.TRANSACTIONS),
    },
    {
      id: DashboardTabs.DEPOSIT,
      title: 'Deposit',
      icon: BsArrowDownLeft,
      onClick: () => changeDashboardTab(DashboardTabs.DEPOSIT),
    },
    {
      id: DashboardTabs.WITHDRAW,
      title: 'Withdraw',
      icon: BsArrowUpRight,
      onClick: () => changeDashboardTab(DashboardTabs.WITHDRAW),
    },
    {
      id: DashboardTabs.CARDS,
      title: 'Cards',
      icon: BsCreditCard2Back,
      onClick: () => changeDashboardTab(DashboardTabs.CARDS),
    },
  ];

  return (
    <section className="grid w-full max-w-screen-xl grid-cols-1 grid-rows-[repeat(3,min-content)] gap-x-12  gap-y-4 md:grid-cols-[280px,auto] lg:gap-x-20 xl:gap-x-40">
      <aside className="row-start-1 row-end-3 hidden w-full flex-shrink-0  flex-col justify-between gap-8 sm:flex-row  md:flex md:max-w-xs md:flex-col md:justify-start ">
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
        className="order-1 md:order-2 md:col-start-2 md:col-end-4"
        balance={currentWalletBalance}
        actionButtons={actionButtons}
        activeDashboardTab={activeDashboardTab}
        verificationStatus={verificationStatus}
        openKYC={openKYC}
      />
      <WalletList
        className="order-2 mt-1 md:hidden"
        createWallet={createWallet}
        wallets={wallets}
        onSelect={selectWallet}
        activeWallet={selectedWallet}
        walletTypes={walletTypes}
      />

      <div className="order-4 md:order-3 md:col-start-2 md:col-end-4 md:mt-4">
        {activeDashboardTab === DashboardTabs.DEPOSIT && <DepositForm {...props} />}
        {activeDashboardTab === DashboardTabs.WITHDRAW && <WithdrawForm {...props} />}
        {activeDashboardTab === DashboardTabs.TRANSACTIONS && <Transactions {...props} />}
        {activeDashboardTab === DashboardTabs.CARDS && <CardsTab {...props} />}
      </div>
    </section>
  );
};

export default Dashboard;
