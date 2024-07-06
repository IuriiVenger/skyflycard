'use client';

import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

import { API } from '@/api/types';
import { vcards } from '@/api/vcards';
import { wallets } from '@/api/wallets';
import Dashboard, { DashboardProps } from '@/components/Dashboard';
import Loader from '@/components/Loader';
import privateRoute from '@/components/privateRoute';
import {
  walletType,
  defaultUpdateInterval,
  WalletTypeValues,
  defaultPaginationParams,
  ModalNames,
  DashboardTabs,
} from '@/constants';
import useExternalCalc from '@/hooks/useExternalCalc';
import useOrder from '@/hooks/useOrder';
import useWallet from '@/hooks/useWallet';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectActiveFiatAvailableCrypto, selectFinanceData, selectUser } from '@/store/selectors';
import {
  loadCards,
  loadMoreTransactions,
  loadSelectedWallet,
  loadTransactions,
  loadSelectedCard,
  setSelectedChain,
  setSelectedCrypto,
  setSelectedFiat,
  setUserWallets,
} from '@/store/slices/finance';
import { setModalVisible } from '@/store/slices/ui';

const DashboardPage = () => {
  const {
    selectedChain,
    selectedCrypto,
    selectedWallet,
    selectedFiat,
    selectedCard,
    chains,
    fiats,
    crypto,
    isAppInitialized,
    userWallets,
    fiatExchangeRate,
    selectedWalletTransactions,
    selectedWalletCards,
  } = useAppSelector(selectFinanceData);

  const { userData } = useAppSelector(selectUser);
  const availableToExchangeCrypto = useAppSelector(selectActiveFiatAvailableCrypto);
  const { createOnRampOrder, createOffRampOrder, createCrypto2CryptoOrder } = useOrder();
  const { getWalletAddress, createWalletAddress } = useWallet();
  const externalCalcData = useExternalCalc();
  const [lastActiveWallet, setLastActiveWallet] = useState<API.Wallets.ExtendWallet | null>(null);
  const dispatch = useAppDispatch();

  const [queryDashboardTab, setQueryDashboardTab] = useQueryState('tab');
  const [queryCardId, setQueryCardId] = useQueryState('card_id');

  const initialDasboardTab = (queryDashboardTab as DashboardTabs) || DashboardTabs.TRANSACTIONS;
  const initialCardId = queryCardId;

  const [activeDashboardTab, setActiveDashboardTab] = useState<DashboardTabs>(initialDasboardTab);
  const [activeCardId, setActiveCardId] = useState<string | null>(initialCardId);

  const walletTypes = Object.values(walletType);

  const selectChain = (chain: API.List.Chains) => dispatch(setSelectedChain(chain));
  const selectCrypto = (currency: API.List.Crypto) => dispatch(setSelectedCrypto(currency));
  const selectFiat = (currency: API.List.Fiat) => dispatch(setSelectedFiat(currency));
  const selectCard = (card_id: string | null) => {
    dispatch(loadSelectedCard(card_id));
  };

  const openKYCModal = () => dispatch(setModalVisible(ModalNames.KYC));

  const changeDashboardTab = (tab: DashboardTabs) => {
    setActiveDashboardTab(tab);
    setQueryDashboardTab(tab);
  };

  const changeActiveCard = (card_id: string | null) => {
    setActiveCardId(card_id);
    setQueryCardId(card_id);
    selectCard(card_id);
  };

  const loadMoreTransactionsHandler = () =>
    selectedWallet &&
    dispatch(
      loadMoreTransactions({
        wallet_uuid: selectedWallet.uuid,
        limit: selectedWalletTransactions.meta.limit,
        offset: selectedWalletTransactions.meta.offset,
      }),
    );

  const createWallet = async (wallet_type: WalletTypeValues) => {
    await wallets.create(wallet_type);

    const newUserWallets = await wallets.getAll();
    const lastWallet = newUserWallets[newUserWallets.length - 1];
    dispatch(setUserWallets(newUserWallets));
    dispatch(loadSelectedWallet(lastWallet.uuid));
  };

  const selectWallet = async (uuid: string) => {
    await dispatch(loadSelectedWallet(uuid));
  };

  const getSensitiveData = async (card_id: string) => {
    const { data } = await vcards.cards.getSensitiveData(card_id);

    return data;
  };

  const onWalletChange = async (wallet: API.Wallets.ExtendWallet) => {
    setLastActiveWallet(wallet);
    dispatch(loadTransactions({ wallet_uuid: wallet.uuid }));
    dispatch(loadCards(wallet.uuid));
    changeActiveCard(null);
  };

  const onWalletTotalAmountUpdate = async (wallet: API.Wallets.ExtendWallet) => {
    setLastActiveWallet(wallet);
    dispatch(
      loadTransactions({
        wallet_uuid: wallet.uuid,
        limit: selectedWalletTransactions.data?.length || defaultPaginationParams.limit,
        offset: 0,
      }),
    );
  };

  const checkWalletUpdates = async () => {
    if (!selectedWallet) {
      return;
    }

    selectedWallet.uuid !== lastActiveWallet?.uuid && onWalletChange(selectedWallet);
    selectedWallet.total_amount !== lastActiveWallet?.total_amount && onWalletTotalAmountUpdate(selectedWallet);
  };

  const dasboardProps: DashboardProps = {
    wallets: userWallets,
    getWalletAddress,
    createWalletAddress,
    selectChain,
    selectedChain,
    selectedWallet,
    selectWallet,
    selectedCard,
    selectCard,
    chainList: chains,
    cryptoList: crypto,
    availableToExchangeCrypto,
    fiatList: fiats,
    selectedCrypto,
    selectedFiat,
    selectCrypto,
    selectFiat,
    exchangeRate: fiatExchangeRate,
    createFiat2CryptoOrder: createOnRampOrder,
    createCrypto2FiatOrder: createOffRampOrder,
    createCrypto2CryptoOrder,
    transactions: selectedWalletTransactions,
    cards: selectedWalletCards,
    loadMoreTransactions: loadMoreTransactionsHandler,
    createWallet,
    walletTypes,
    externalCalcData,
    verificationStatus: userData?.kyc_status,
    openKYC: openKYCModal,
    changeDashboardTab,
    activeDashboardTab,
    changeActiveCard,
    activeCardId,
    getSensitiveData,
  };

  useEffect(() => {
    checkWalletUpdates();

    const intervalLoadSelectedWallet = setInterval(() => {
      selectedWallet && dispatch(loadSelectedWallet(selectedWallet.uuid));
    }, defaultUpdateInterval);

    return () => clearInterval(intervalLoadSelectedWallet);
  }, [selectedWallet]);

  useEffect(() => {
    queryDashboardTab && setActiveDashboardTab(queryDashboardTab as DashboardTabs);
  }, [queryDashboardTab]);

  useEffect(() => {
    activeCardId && selectCard(activeCardId);
  }, []);

  if (!isAppInitialized) {
    return <Loader />;
  }

  return <Dashboard {...dasboardProps} />;
};

export default privateRoute(DashboardPage);
