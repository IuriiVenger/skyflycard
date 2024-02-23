'use client';

import { API } from '@/api/types';
import CryptoForm from '@/components/CryptoForm';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData } from '@/store/selectors';
import { setSelectedCrypto, setSelectedFiat } from '@/store/slices/finance';

const MainPageCryptoForm = () => {
  const { selectedCrypto, selectedFiat, fiats, crypto, fiatExchangeRate, isAppInitialized } =
    useAppSelector(selectFinanceData);

  const dispatch = useAppDispatch();
  const setCrypto = (currency: API.List.Crypto) => dispatch(setSelectedCrypto(currency));
  const setFiat = (currency: API.List.Fiat) => dispatch(setSelectedFiat(currency));

  return (
    isAppInitialized && (
      <CryptoForm
        selectedCrypto={selectedCrypto}
        selectedFiat={selectedFiat}
        fiatList={fiats}
        cryptoList={crypto}
        fiatExchangeRate={fiatExchangeRate}
        selectCrypto={setCrypto}
        selectFiat={setFiat}
      />
    )
  );
};

export default MainPageCryptoForm;
