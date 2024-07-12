'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '..';
import { selectConfig, selectFinanceData } from '../selectors';

import { setFiatExchangeRate } from '../slices/finance';

import { exchange } from '@/api/exchange';
import useInitApp from '@/hooks/useInitApp';

const StoreWatchers = () => {
  const dispatch = useAppDispatch();
  const { selectedFiat } = useAppSelector(selectFinanceData);
  const { initApp } = useInitApp(dispatch);

  const loadFiatExchangeRate = async () => {
    const fiatExchangeRate = await exchange.fiat2crypto.getByUuid(selectedFiat.uuid);

    dispatch(setFiatExchangeRate(fiatExchangeRate));
  };

  useEffect(() => {
    loadFiatExchangeRate();
  }, [selectedFiat]);

  useEffect(() => {
    initApp();
  }, []);

  return null;
};

export default StoreWatchers;
