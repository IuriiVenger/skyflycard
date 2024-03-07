'use client';

import { API } from '@/api/types';
import CryptoForm from '@/components/CryptoForm/CryptoForm';
import useExchange from '@/hooks/useExchange';
import useOrder from '@/hooks/useOrder';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData } from '@/store/selectors';
import { setSelectedCrypto, setSelectedFiat } from '@/store/slices/finance';

const MainPageCryptoForm = () => {
  const { selectedCrypto, selectedFiat, fiats, crypto, fiatExchangeRate, isAppInitialized, userWallets, chains } =
    useAppSelector(selectFinanceData);
  const { createOnRampOrder } = useOrder();

  const dispatch = useAppDispatch();
  const setCrypto = (currency: API.List.Crypto) => dispatch(setSelectedCrypto(currency));
  const setFiat = (currency: API.List.Fiat) => dispatch(setSelectedFiat(currency));
  const exchangeData = useExchange(fiatExchangeRate, selectedCrypto);

  return (
    isAppInitialized && (
      <CryptoForm
        activeWallet={userWallets[0]}
        createFiat2CryptoOrder={createOnRampOrder}
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
