import { initMiniApp, RequestedContact } from '@telegram-apps/sdk';
import { AxiosResponse } from 'axios';
import cn from 'classnames';
import { FC, useState } from 'react';
import { BsArrowDownLeft, BsArrowUpRight, BsCreditCard2Back } from 'react-icons/bs';

import { IoIosList } from 'react-icons/io';

import { PiSignIn, PiSignOut } from 'react-icons/pi';

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
  activeCardId: string | null;
  activeDashboardTab: DashboardTabs;
  allowedCryptoToFiatList: API.List.Crypto[];
  availableToExchangeCrypto: API.List.Crypto[];
  bins: API.Cards.Bin[];
  cardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null>;
  cards: StoreDataWithStatus<API.Cards.CardDetailItem[] | null>;
  chainList: API.List.Chains[];
  changeActiveCard: (card_id: string | null) => void;
  changeDashboardTab: (tab: DashboardTabs) => void;
  createCard: (data: API.Cards.Create.Request) => Promise<AxiosResponse<API.Cards.Create.Response, any>>;
  createCrypto2CryptoOrder: (requestData: API.Orders.Crypto.Withdrawal.Request) => Promise<void | null>;
  createCrypto2FiatOrder: (requestData: API.Orders.OffRamp.Request) => Promise<void | null>;
  createFiat2CryptoOrder: (requestData: API.Orders.OnRamp.Request) => Promise<void | null>;
  createInternalTopUpOrder: (requestData: API.Orders.VCards.Topup.Internal.Request) => Promise<void | null>;
  createWallet: (wallet_type: WalletTypeValues) => Promise<void>;
  createWalletAddress: (data: API.Wallets.WalletChain.Request) => Promise<API.Wallets.WalletChain.Response>;
  cryptoList: API.List.Crypto[];
  exchangeRate: API.Exchange.F2C[];
  externalCalcData: UseExternalCalcData;
  fiatList: API.List.Fiat[];
  getSensitiveData: (card_id: string) => Promise<API.Cards.SensitiveData>;
  getWalletAddress: (chain: number, wallet_uuid: string) => Promise<API.Wallets.WalletChain.Response>;
  loadMoreCardTransactions: () => void;
  loadMoreWalletTransactions: () => void;
  loadSelectedWalletCards: () => void;
  openKYC: () => void;
  selectCard: (card_id: string) => void;
  selectChain: (chain: API.List.Chains) => void;
  selectCrypto: (crypto: API.List.Crypto) => void;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectWallet: (wallet_uuid: string) => void;
  selectedCard: StoreDataWithStatus<API.Cards.CardDetailItem | null>;
  selectedChain: API.List.Chains;
  selectedCrypto: API.List.Crypto;
  selectedFiat: API.List.Fiat;
  selectedWallet: API.Wallets.ExtendWallet | null;
  updateCard: (card_id: string, data: API.Cards.Update.Request) => Promise<void>;
  verificationStatus?: KYCStatuses;
  walletTransactions: StoreDataWithStatusAndMeta<API.WalletTransactions.Transaction[] | null>;
  walletTypes: ValueWithLabel[];
  wallets: API.Wallets.Wallet[];
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
    activeCardId,
  } = props;
  const currentWalletBalance = roundToDecimals(selectedWallet?.total_amount || 0);

  const isTransactionsTab = activeDashboardTab === DashboardTabs.TRANSACTIONS;
  const isCardDetailMode = activeDashboardTab === DashboardTabs.CARDS && activeCardId;
  const isMainInformationHidden = isCardDetailMode;

  const actionButtons = [
    {
      id: DashboardTabs.TRANSACTIONS,
      title: 'Transactions',
      icon: <IoIosList />,
      onClick: () => changeDashboardTab(DashboardTabs.TRANSACTIONS),
    },
    {
      id: DashboardTabs.DEPOSIT,
      title: 'Deposit',
      icon: <PiSignIn className="rotate-90" />,
      onClick: () => changeDashboardTab(DashboardTabs.DEPOSIT),
    },
    {
      id: DashboardTabs.WITHDRAW,
      title: 'Withdraw',
      icon: <PiSignOut className="rotate-[270deg]" />,
      onClick: () => changeDashboardTab(DashboardTabs.WITHDRAW),
    },
    {
      id: DashboardTabs.CARDS,
      title: 'Cards',
      icon: <BsCreditCard2Back />,
      onClick: () => changeDashboardTab(DashboardTabs.CARDS),
    },
  ];

  /// mini-apps
  const [contacts, setContacts] = useState<RequestedContact | null>(null);
  const [miniApp] = initMiniApp();
  miniApp.requestContact().then((contact) => {
    setContacts(contact);
    // Output:
    // {
    //   authDate: Date(...),
    //   hash: '...',
    //   contact: {
    //     firstName: '...',
    //     phoneNumber: '+38291789233',
    //   },
    // };
  });

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
      {JSON.stringify(contacts)}

      {!isMainInformationHidden && (
        <>
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
        </>
      )}

      <div
        className={cn(
          'order-4  md:order-3 md:col-start-2 md:col-end-4 md:mt-4',
          isTransactionsTab && 'overflow-scroll',
        )}
      >
        {activeDashboardTab === DashboardTabs.DEPOSIT && <DepositForm {...props} />}
        {activeDashboardTab === DashboardTabs.WITHDRAW && <WithdrawForm {...props} />}
        {activeDashboardTab === DashboardTabs.TRANSACTIONS && <Transactions {...props} />}
        {activeDashboardTab === DashboardTabs.CARDS && <CardsTab {...props} />}
      </div>
    </section>
  );
};

export default Dashboard;
