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
  <section className="relative flex min-h-[680px]  flex-col items-center  self-stretch overflow-hidden px-16 py-16 max-md:px-5">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/064da38b69b849f8b656e91754b7654157d090aec17857054cedb39d4c700212?apiKey=73f80fdb1c984aeeab687b7998ab4028&"
      alt="Crypto background"
      className="absolute inset-0 h-full w-full object-cover "
    />
    <div className="relative flex flex-grow flex-col gap-14">
      <h1 className="self-center whitespace-nowrap text-center text-4xl font-bold leading-[54px] tracking-tighter text-white">
        Swap crypto instantly
      </h1>
      <CryptoForm {...props} />
    </div>
  </section>
);

export default CryptoSwap;
