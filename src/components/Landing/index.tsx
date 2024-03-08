import { FC } from 'react';

import Contacts from './Contacts';
import ContactSupport from './ContactSupport';

import CryptoSwap from './CryptoSwap';
import CryptoTradingInfo from './CryptoTradingInfo';

import FAQ from './FAQ';
import HaveMoreQuestions from './HaveMoreQuestions';
import LandingFooter from './LandingFooter';
import WalletOverview from './WalletOverview';

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
};

const Landing: FC<LandingProps> = (props) => (
  <div className="absolute left-0 flex w-screen flex-col items-center">
    <WalletOverview />
    <CryptoSwap {...props} />
    <ContactSupport />
    <CryptoTradingInfo />
    <HaveMoreQuestions />
    <FAQ />
    <Contacts />
    <LandingFooter />
  </div>
);

export default Landing;
