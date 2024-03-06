'use client';

import { useEffect, useState } from 'react';

import { API } from '@/api/types';
import { wallets } from '@/api/wallets';
import Dashboard from '@/components/Dashboard';
import Loader from '@/components/Loader';
import { walletType, defaultUpdateInterval, WalletTypeValues, defaultPaginationParams } from '@/constants';
import useExternalCalc from '@/hooks/useExternalCalc';
import useOrder from '@/hooks/useOrder';
import useWallet from '@/hooks/useWallet';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData } from '@/store/selectors';
import {
  loadMoreTransactions,
  loadSelectedWallet,
  loadTransactions,
  setSelectedChain,
  setSelectedCrypto,
  setSelectedFiat,
  setUserWallets,
} from '@/store/slices/finance';

const DashboardPage = () => {
  const {
    selectedChain,
    selectedCrypto,
    selectedWallet,
    selectedFiat,
    chains,
    fiats,
    crypto,
    isAppInitialized,
    userWallets,
    fiatExchangeRate,
    selectedWalletTransactions,
  } = useAppSelector(selectFinanceData);
  const { createOnRampOrder, createOffRampOrder, createCrypto2CryptoOrder } = useOrder();
  const { getWalletAddress, createWalletAddress } = useWallet();

  const dispatch = useAppDispatch();
  const externalCalcData = useExternalCalc();

  const selectChain = (chain: API.List.Chains) => dispatch(setSelectedChain(chain));
  const selectCrypto = (currency: API.List.Crypto) => dispatch(setSelectedCrypto(currency));
  const selectFiat = (currency: API.List.Fiat) => dispatch(setSelectedFiat(currency));

  const [lastActiveWallet, setLastActiveWallet] = useState<API.Wallets.ExtendWallet | null>(null);

  const walletTypes = Object.values(walletType);

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

  const updateTransactionsOnWalletChange = async () => {
    if (selectedWallet) {
      if (selectedWallet.uuid !== lastActiveWallet?.uuid) {
        setLastActiveWallet(selectedWallet);
        dispatch(loadTransactions({ wallet_uuid: selectedWallet.uuid }));
      }

      if (selectedWallet.total_amount !== lastActiveWallet?.total_amount) {
        setLastActiveWallet(selectedWallet);
        dispatch(
          loadTransactions({
            wallet_uuid: selectedWallet.uuid,
            limit: selectedWalletTransactions.data?.length || defaultPaginationParams.limit,
            offset: 0,
          }),
        );
      }
    }
  };

  useEffect(() => {
    updateTransactionsOnWalletChange();

    const intervalLoadSelectedWallet = setInterval(() => {
      selectedWallet && dispatch(loadSelectedWallet(selectedWallet.uuid));
    }, defaultUpdateInterval);

    return () => clearInterval(intervalLoadSelectedWallet);
  }, [selectedWallet]);

  if (!isAppInitialized) {
    return <Loader />;
  }

  return (
    <Dashboard
      wallets={userWallets}
      getWalletAddress={getWalletAddress}
      createWalletAddress={createWalletAddress}
      selectChain={selectChain}
      selectedChain={selectedChain}
      selectedWallet={selectedWallet}
      selectWallet={selectWallet}
      chainList={chains}
      cryptoList={crypto}
      fiatList={fiats}
      selectedCrypto={selectedCrypto}
      selectedFiat={selectedFiat}
      selectCrypto={selectCrypto}
      selectFiat={selectFiat}
      exchangeRate={fiatExchangeRate}
      createFiat2CryptoOrder={createOnRampOrder}
      createCrypto2FiatOrder={createOffRampOrder}
      createCrypto2CryptoOrder={createCrypto2CryptoOrder}
      transactions={selectedWalletTransactions}
      loadMoreTransactions={loadMoreTransactionsHandler}
      createWallet={createWallet}
      walletTypes={walletTypes}
      externalCalcData={externalCalcData}
    />
  );
};

export default DashboardPage;
