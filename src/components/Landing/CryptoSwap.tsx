import React from 'react';

import CryptoForm from '../CryptoForm/CryptoForm';

import { API } from '@/api/types';
import cryptoBackground from '@/assets/img/crypto_background.png';
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
  <section className="relative flex min-h-[680px]  flex-col items-center  self-stretch overflow-hidden px-16 py-16 max-md:px-5">
    <img
      loading="lazy"
      src={cryptoBackground.src}
      alt="Crypto background"
      className="absolute inset-0 h-full w-full object-cover "
    />
    <div className="relative flex w-full flex-grow flex-col items-center gap-14">
      <h1 className="self-center  text-center text-4xl font-bold leading-[54px] tracking-tighter text-white">
        Swap crypto instantly
      </h1>
      <CryptoForm {...props} />
    </div>
  </section>
);

export default CryptoSwap;
