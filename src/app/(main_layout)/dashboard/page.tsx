'use client';

import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

import { API } from '@/api/types';
import { vcards } from '@/api/vcards';
import { wallets } from '@/api/wallets';
import Dashboard, { DashboardProps } from '@/components/Dashboard';
import privateRoute from '@/components/privateRoute';
import Loader from '@/components/ui/Loader';
import whiteLabelConfig from '@/config/whitelabel';
import {
  walletType,
  defaultUpdateInterval,
  WalletTypeValues,
  defaultPaginationParams,
  ModalNames,
  DashboardTabs,
  allowedCryptoToFiatUuid,
  cardInitialPaginationParams,
  cardLoadMoreDefaultLimit,
} from '@/constants';
import useExternalCalc from '@/hooks/useExternalCalc';
import useOrder from '@/hooks/useOrder';
import useWallet from '@/hooks/useWallet';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectActiveFiatAvailableCrypto, selectConfig, selectFinanceData, selectUser } from '@/store/selectors';
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
  loadMoreCards,
  hiddenLoadSelectedWallet,
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
    userWallets,
    fiatExchangeRate,
    selectedWalletTransactions,
    selectedWalletCards,
    selectedCardTransactions,
  } = useAppSelector(selectFinanceData);

  const { isWebAppInitialized } = useAppSelector(selectConfig);

  const { userData } = useAppSelector(selectUser);
  const availableToExchangeCrypto = useAppSelector(selectActiveFiatAvailableCrypto);
  const { createOnRampOrder, createOffRampOrder, createCrypto2CryptoOrder, createInternalTopUpOrder } = useOrder();
  const { getWalletAddress, createWalletAddress } = useWallet();
  const externalCalcData = useExternalCalc();
  const [lastActiveWallet, setLastActiveWallet] = useState<API.Wallets.ExtendWallet | null>(null);
  const dispatch = useAppDispatch();

  const [queryDashboardTab, setQueryDashboardTab] = useQueryState('tab');

  const initialDasboardTab = (queryDashboardTab as DashboardTabs) || DashboardTabs.CARDS;
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
    const { limit, offset } = cardInitialPaginationParams;
    selectedWallet.data && dispatch(loadCards({ wallet_uuid: selectedWallet.data.uuid, limit, offset }));
  };

  const loadMoreCardsHandler = async () => {
    selectedWallet.data &&
      dispatch(
        loadMoreCards({
          wallet_uuid: selectedWallet.data.uuid,
          limit: cardLoadMoreDefaultLimit,
          offset: selectedWalletCards.meta.offset,
        }),
      );
  };

  const loadMoreWalletTransactionsHandler = () =>
    selectedWallet.data &&
    dispatch(
      loadMoreWalletTransactions({
        wallet_uuid: selectedWallet.data.uuid,
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

  const getOTP = async (card_id: string) => {
    const { data } = await vcards.cards.sensitiveData.otp.get(card_id);

    return data;
  };

  const getSensitiveData = async (card_id: string) => {
    const { data } = await vcards.cards.sensitiveData.get(card_id);

    return data;
  };

  const onWalletChange = async (wallet: API.Wallets.ExtendWallet) => {
    setLastActiveWallet(wallet);
    dispatch(loadWalletTransactions({ wallet_uuid: wallet.uuid }));
    dispatch(
      loadCards({
        wallet_uuid: wallet.uuid,
        limit: cardInitialPaginationParams.limit,
        offset: cardInitialPaginationParams.offset,
      }),
    );
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
    if (!selectedWallet.data) {
      return;
    }

    selectedWallet.data.uuid !== lastActiveWallet?.uuid && onWalletChange(selectedWallet.data);
    selectedWallet.data.total_amount !== lastActiveWallet?.total_amount &&
      onWalletTotalAmountUpdate(selectedWallet.data);
  };

  const createCard = async (data: API.Cards.Create.Request) => vcards.cards.create(data);

  const updateCard = async (card_id: string, data: API.Cards.Update.Request) => {
    await vcards.cards.update(card_id, data);
    dispatch(
      loadCards({
        wallet_uuid: selectedWallet.data?.uuid || '',
        limit: selectedWalletCards.meta.limit,
        offset: selectedWalletCards.meta.offset,
      }),
    );
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
    getOTP,
    getSensitiveData,
    getWalletAddress,
    loadMoreCards: loadMoreCardsHandler,
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
    whiteLabelConfig,
    updateCard,
  };

  useEffect(() => {
    checkWalletUpdates();

    const intervalLoadSelectedWallet = setInterval(() => {
      selectedWallet.data && dispatch(hiddenLoadSelectedWallet(selectedWallet.data.uuid));
    }, defaultUpdateInterval);

    return () => clearInterval(intervalLoadSelectedWallet);
  }, [selectedWallet]);

  useEffect(() => {
    queryDashboardTab && setActiveDashboardTab(queryDashboardTab as DashboardTabs);
  }, [queryDashboardTab]);

  useEffect(() => {
    activeCardId && selectCard(activeCardId);
  }, []);

  if (!isWebAppInitialized) {
    return <Loader />;
  }

  return <Dashboard {...dasboardProps} />;
};

export default privateRoute(DashboardPage);
