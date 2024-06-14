import React from 'react';

import CryptoForm from '../CryptoForm/CryptoForm';

import { API } from '@/api/types';
import { UseExchangeData } from '@/hooks/useExchange';

export type CryptoSwapProps = {
  selectCrypto: (crypto: API.List.Crypto) => void;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectedCrypto: API.List.Crypto;
  selectedFiat: API.List.Fiat;
  chainList: API.List.Chains[];
  cryptoList: API.List.Crypto[];
  fiatList: API.List.Fiat[];
  className?: string;
  exchangeData: UseExchangeData;
};

const CryptoSwap: React.FC<CryptoSwapProps> = (props) => (
  <section className="relative flex flex-col items-center  self-stretch overflow-hidden px-4 py-12 max-md:px-5 lg:px-12 lg:py-24">
    <div className="relative flex w-full flex-grow flex-col items-center gap-14">
      <CryptoForm {...props} />
    </div>
  </section>
);

export default CryptoSwap;
