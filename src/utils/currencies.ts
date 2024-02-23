import ada from 'cryptocurrency-icons/svg/icon/ada.svg';
import bnb from 'cryptocurrency-icons/svg/icon/bnb.svg';
import btc from 'cryptocurrency-icons/svg/icon/btc.svg';
import dot from 'cryptocurrency-icons/svg/icon/dot.svg';
import eth from 'cryptocurrency-icons/svg/icon/eth.svg';
import sol from 'cryptocurrency-icons/svg/icon/sol.svg';
import usdc from 'cryptocurrency-icons/svg/icon/usdc.svg';
import usdt from 'cryptocurrency-icons/svg/icon/usdt.svg';
import xrp from 'cryptocurrency-icons/svg/icon/xrp.svg';
import currencyFlag from 'react-currency-flags/dist/flags';

import { API } from '@/api/types';

type CryptoIcons = {
  [key: string]: string;
};

export const cryptoIcons: CryptoIcons = {
  ada,
  bnb,
  btc,
  dot,
  eth,
  sol,
  usdt,
  xrp,
  usdc,
};

export const isCrypto = (currency: API.List.Crypto | API.List.Fiat): currency is API.List.Crypto =>
  (currency as API.List.Crypto).name !== undefined;

export const getCurrencyIconSrc = (currency: API.List.Crypto | API.List.Fiat): string =>
  isCrypto(currency)
    ? cryptoIcons[currency.symbol.toLowerCase()] || cryptoIcons.btc
    : currencyFlag[currency.code.toLowerCase() as keyof typeof currencyFlag];
