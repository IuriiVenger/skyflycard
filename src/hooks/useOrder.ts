import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

import { toast } from 'react-toastify';

import { orders } from '@/api/orders';
import { API } from '@/api/types';
import { DashboardTabs, ModalNames } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData, selectIsUserLoggedIn, selectUser } from '@/store/selectors';
import { loadSelectedWallet } from '@/store/slices/finance';
import { setModalVisible } from '@/store/slices/ui';

const useOrder = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const { userData } = useAppSelector(selectUser);
  const { crypto } = useAppSelector(selectFinanceData);

  const availableLimit = userData && userData.turnover_limit - userData.total_turnover.total;

  const isUserLoggedInRef = useRef(isUserLoggedIn);
  const availableLimitRef = useRef(availableLimit);

  const openKYCModal = () => dispatch(setModalVisible(ModalNames.KYC));

  const getCryptoSymbolByUuid = (uuid: string) => {
    const selectedCrypto = crypto.find((c) => c.uuid === uuid);
    return selectedCrypto?.symbol || '';
  };

  isUserLoggedInRef.current = isUserLoggedIn;
  availableLimitRef.current = availableLimit;

  const checkOrderPossibility = (amount: number) => {
    if (!isUserLoggedInRef.current) {
      router.push('/auth/login');
      return false;
    }

    if (availableLimitRef.current && availableLimitRef.current < amount) {
      openKYCModal();
      return false;
    }

    return true;
  };

  const createOnRampOrder = useCallback(async (orderData: API.Orders.OnRamp.Request) => {
    if (!isUserLoggedInRef.current) {
      router.push('/auth/login');
      return null;
    }

    if (availableLimitRef.current && availableLimitRef.current < orderData.amount) {
      openKYCModal();
      return null;
    }

    const { data } = await orders.onramp.create(orderData);

    return data && router.push(data.redirect_url);
  }, []);

  const createOffRampOrder = useCallback(async (orderData: API.Orders.OffRamp.Request) => {
    const isOrderPossible = checkOrderPossibility(orderData.amount);

    if (!isOrderPossible) {
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
