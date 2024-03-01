/* eslint-disable import/no-duplicates */
import ada from 'cryptocurrency-icons/svg/icon/ada.svg';
import bnb from 'cryptocurrency-icons/svg/icon/bnb.svg';
import bsc from 'cryptocurrency-icons/svg/icon/bnb.svg';
import btc from 'cryptocurrency-icons/svg/icon/btc.svg';
import dot from 'cryptocurrency-icons/svg/icon/dot.svg';
import eth from 'cryptocurrency-icons/svg/icon/eth.svg';
import matic from 'cryptocurrency-icons/svg/icon/matic.svg';
import sol from 'cryptocurrency-icons/svg/icon/sol.svg';
import tron from 'cryptocurrency-icons/svg/icon/trx.svg';
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
  bsc,
  btc,
  dot,
  eth,
  matic,
  sol,
  tron,
  usdt,
  xrp,
  usdc,
};

export const isFiat = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains): currency is API.List.Fiat =>
  (currency as API.List.Fiat).code !== undefined && (currency as API.List.Fiat).enabled !== undefined;

export const isCrypto = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains): currency is API.List.Crypto =>
  (currency as API.List.Crypto).contract !== undefined && (currency as API.List.Crypto).chain !== undefined;

export const isChain = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains): currency is API.List.Chains =>
  (currency as API.List.Chains).id !== undefined && (currency as API.List.Chains).created_at !== undefined;

export const getCurrencyIconSrc = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains): string =>
  isFiat(currency)
    ? currencyFlag[currency.code.toLowerCase() as keyof typeof currencyFlag]
    : cryptoIcons[currency.symbol.toLowerCase()] || cryptoIcons.btc;
