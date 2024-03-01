import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

import { toast } from 'react-toastify';

import { orders } from '@/api/orders';
import { API } from '@/api/types';
import { DashboardTabs } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData, selectIsUserLoggedIn } from '@/store/selectors';
import { loadSelectedWallet } from '@/store/slices/finance';

const useOrder = () => {
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const { crypto } = useAppSelector(selectFinanceData);
  const isUserLoggedInRef = useRef<boolean>(isUserLoggedIn);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const getCryptoSymbolByUuid = (uuid: string) => {
    const selectedCrypto = crypto.find((c) => c.uuid === uuid);
    return selectedCrypto?.symbol || '';
  };

  isUserLoggedInRef.current = isUserLoggedIn;

  const createOnRampOrder = useCallback(async (orderData: API.Orders.OnRamp.Request) => {
    if (!isUserLoggedInRef.current) {
      router.push('/auth/login');
      return null;
    }

    const { data } = await orders.onramp.create(orderData);

    return data && router.push(data.redirect_url);
  }, []);

  const createOffRampOrder = useCallback(async (orderData: API.Orders.OffRamp.Request) => {
    if (!isUserLoggedInRef.current) {
      router.push('/auth/login');
      return null;
    }

    const { data } = await orders.offramp.create(orderData);
    toast.success(`Order to withdraw ${data.amount_fiat} to card №${data.card_number} successfully created.`);
    router.push(`/dashboard?tab=${DashboardTabs.TRANSACTIONS}`);
    await Promise.all([dispatch(loadSelectedWallet(orderData.wallet_uuid))]);
  }, []);

  const createCrypto2CryptoOrder = useCallback(async (orderData: API.Orders.Crypto.Withdrawal.Request) => {
    if (!isUserLoggedInRef.current) {
      router.push('/auth/login');
      return null;
    }

    const { data } = await orders.crypto.withdrawal.create(orderData);
    toast.success(`Order to withdraw ${data.amount} ${getCryptoSymbolByUuid(data.crypto_uuid)} successfully created.`);
    router.push(`/dashboard?tab=${DashboardTabs.TRANSACTIONS}`);
    await Promise.all([dispatch(loadSelectedWallet(orderData.wallet_uuid))]);
  }, []);

  return { createOnRampOrder, createOffRampOrder, createCrypto2CryptoOrder };
};

export default useOrder;
