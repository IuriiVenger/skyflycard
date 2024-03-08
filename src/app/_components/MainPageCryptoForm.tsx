'use client';

import { API } from '@/api/types';
import CryptoForm from '@/components/CryptoForm/CryptoForm';
import useExchange from '@/hooks/useExchange';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData } from '@/store/selectors';
import { setSelectedCrypto, setSelectedFiat } from '@/store/slices/finance';

const MainPageCryptoForm = () => {
  const { selectedCrypto, selectedFiat, fiats, crypto, fiatExchangeRate, isAppInitialized, chains } =
    useAppSelector(selectFinanceData);

  const dispatch = useAppDispatch();
  const setCrypto = (currency: API.List.Crypto) => dispatch(setSelectedCrypto(currency));
  const setFiat = (currency: API.List.Fiat) => dispatch(setSelectedFiat(currency));
  const exchangeData = useExchange(fiatExchangeRate, selectedCrypto);

  return (
    isAppInitialized && (
      <CryptoForm
        selectedCrypto={selectedCrypto}
        selectedFiat={selectedFiat}
        chainList={chains}
        fiatList={fiats}
        cryptoList={crypto}
        selectCrypto={setCrypto}
        selectFiat={setFiat}
        exchangeData={exchangeData}
      />
    )
  );
};

export default MainPageCryptoForm;
