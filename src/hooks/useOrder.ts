import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

import { orders } from '@/api/orders';
import { API } from '@/api/types';
import { useAppSelector } from '@/store';
import { selectIsUserLoggedIn } from '@/store/selectors';

const useOrder = () => {
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const isUserLoggedInRef = useRef<boolean>(isUserLoggedIn);
  const router = useRouter();

  isUserLoggedInRef.current = isUserLoggedIn;

  const createOrder = useCallback(async (orderData: API.Orders.OnRamp.Request) => {
    if (!isUserLoggedInRef.current) {
      router.push('/auth/login');
      return null;
    }

    const { data } = await orders.onramp(orderData);

    return data && router.push(data.redirect_url);
  }, []);
  return { createOrder };
};

export default useOrder;
