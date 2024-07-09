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
  allowedCryptoToFiatUuid,
} from '@/constants';
import useExternalCalc from '@/hooks/useExternalCalc';
import useOrder from '@/hooks/useOrder';
import useWallet from '@/hooks/useWallet';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectActiveFiatAvailableCrypto, selectFinanceData, selectUser } from '@/store/selectors';
import {
  loadCards,
  loadMoreWalletTransactions,
  loadSelectedWallet,
  loadWalletTransactions,
  loadCardTransactions,
  loadMoreCardTransactions,
  loadSelectedCard,
  setSelectedChain,
  setSelectedCrypto,
  setSelectedFiat,
  setUserWallets,
  clearSelectedCard,
} from '@/store/slices/finance';
import { setModalVisible } from '@/store/slices/ui';

const DashboardPage = () => {
  const {
    selectedChain,
    selectedCrypto,
    selectedWallet,
    selectedFiat,
    selectedCard,
    bins,
    chains,
    fiats,
    crypto,
    isAppInitialized,
    userWallets,
    fiatExchangeRate,
    selectedWalletTransactions,
    selectedWalletCards,
    selectedCardTransactions,
  } = useAppSelector(selectFinanceData);

  const { userData } = useAppSelector(selectUser);
  const availableToExchangeCrypto = useAppSelector(selectActiveFiatAvailableCrypto);
  const { createOnRampOrder, createOffRampOrder, createCrypto2CryptoOrder, createInternalTopUpOrder } = useOrder();
  const { getWalletAddress, createWalletAddress } = useWallet();
  const externalCalcData = useExternalCalc();
  const [lastActiveWallet, setLastActiveWallet] = useState<API.Wallets.ExtendWallet | null>(null);
  const dispatch = useAppDispatch();

  const [queryDashboardTab, setQueryDashboardTab] = useQueryState('tab');

  const initialDasboardTab = (queryDashboardTab as DashboardTabs) || DashboardTabs.TRANSACTIONS;
  const allowedCryptoToFiatList = crypto.filter((item) => allowedCryptoToFiatUuid.includes(item.uuid));

  const [activeDashboardTab, setActiveDashboardTab] = useState<DashboardTabs>(initialDasboardTab);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const walletTypes = Object.values(walletType);

  const selectChain = (chain: API.List.Chains) => dispatch(setSelectedChain(chain));
  const selectCrypto = (currency: API.List.Crypto) => dispatch(setSelectedCrypto(currency));
  const selectFiat = (currency: API.List.Fiat) => dispatch(setSelectedFiat(currency));
  const selectCard = (card_id: string) =>
    Promise.all([dispatch(loadSelectedCard(card_id)), dispatch(loadCardTransactions({ card_id }))]);

  const openKYCModal = () => dispatch(setModalVisible(ModalNames.KYC));

  const changeActiveCard = async (card_id: string | null) => {
    setActiveCardId(card_id);
    if (!card_id) {
      dispatch(clearSelectedCard());
      return;
    }

    await selectCard(card_id);
  };

  const changeDashboardTab = (tab: DashboardTabs) => {
    setActiveDashboardTab(tab);
    setQueryDashboardTab(tab);
    activeCardId && changeActiveCard(null);
  };

  const loadSelectedWalletCards = async () => {
    selectedWallet && dispatch(loadCards(selectedWallet.uuid));
  };

  const loadMoreWalletTransactionsHandler = () =>
    selectedWallet &&
    dispatch(
      loadMoreWalletTransactions({
        wallet_uuid: selectedWallet.uuid,
        limit: selectedWalletTransactions.meta.limit,
        offset: selectedWalletTransactions.meta.offset,
      }),
    );

  const loadMoreCardTransactionsHandler = () =>
    selectedCard.data &&
    dispatch(
      loadMoreCardTransactions({
        card_id: selectedCard.data.cardId,
        limit: selectedCardTransactions.meta.limit,
        offset: selectedCardTransactions.meta.offset,
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
    dispatch(loadWalletTransactions({ wallet_uuid: wallet.uuid }));
    dispatch(loadCards(wallet.uuid));
    changeActiveCard(null);
  };

  const onWalletTotalAmountUpdate = async (wallet: API.Wallets.ExtendWallet) => {
    setLastActiveWallet(wallet);
    dispatch(
      loadWalletTransactions({
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

  const createCard = async (data: API.Cards.Create.Request) => vcards.cards.create(data);

  const updateCard = async (card_id: string, data: API.Cards.Update.Request) => {
    await vcards.cards.update(card_id, data);
    await selectCard(card_id);
  };

  const dasboardProps: DashboardProps = {
    activeCardId,
    activeDashboardTab,
    allowedCryptoToFiatList,
    availableToExchangeCrypto,
    bins,
    cardTransactions: selectedCardTransactions,
    cards: selectedWalletCards,
    chainList: chains,
    changeActiveCard,
    changeDashboardTab,
    createCard,
    createCrypto2CryptoOrder,
    createCrypto2FiatOrder: createOffRampOrder,
    createFiat2CryptoOrder: createOnRampOrder,
    createInternalTopUpOrder,
    createWallet,
    createWalletAddress,
    cryptoList: crypto,
    externalCalcData,
    fiatList: fiats,
    exchangeRate: fiatExchangeRate,
    getSensitiveData,
    getWalletAddress,
    loadMoreCardTransactions: loadMoreCardTransactionsHandler,
    loadMoreWalletTransactions: loadMoreWalletTransactionsHandler,
    loadSelectedWalletCards,
    openKYC: openKYCModal,
    selectCard,
    selectedCard,
    selectedChain,
    selectedCrypto,
    selectedFiat,
    selectedWallet,
    selectChain,
    selectCrypto,
    selectFiat,
    selectWallet,
    verificationStatus: userData?.kyc_status,
    walletTransactions: selectedWalletTransactions,
    walletTypes,
    wallets: userWallets,
    updateCard,
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
