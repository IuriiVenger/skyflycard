import { FC } from 'react';

import Contacts from './Contacts';
import CryptoSwap from './CryptoSwap';
import Features from './Features';
import HaveMoreQuestions from './HaveMoreQuestions';
import LandingTitle from './LandingTitle';

import { API } from '@/api/types';
import { UseExchangeData } from '@/hooks/useExchange';

type LandingProps = {
  selectCrypto: (crypto: API.List.Crypto) => void;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectedCrypto: API.List.Crypto;
  selectedFiat: API.List.Fiat;
  chainList: API.List.Chains[];
  cryptoList: API.List.Crypto[];
  fiatList: API.List.Fiat[];
  className?: string;
  exchangeData: UseExchangeData;
  isUserLoggedIn: boolean;
};

const Landing: FC<LandingProps> = (props) => (
  <div className="-mb-20 -mt-8 flex">
    <div className="relative left-0 flex w-screen flex-col items-center">
      <LandingTitle id="title" {...props} />
      <Features id="features" />
      <CryptoSwap {...props} id="exchange" />
      <HaveMoreQuestions id="haveMoreQuestion" />
      <Contacts id="contacts" />
    </div>
  </div>
);

export default Landing;
