import { WalletType } from './types';

export enum RequestStatus {
  NONE = 'none',
  PENDING = 'pending',
  FULLFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export enum ResponseStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  VERIFICATION_EXPIRED = 419,
  UNPROCESSABLE_ENTITY = 422,
  USER_BLOCKED = 423,
  SERVER_ERROR = 500,
}

export const defaultCurrency = {
  chain: {
    id: 1,
    enabled: true,
    name: 'Tron',
    symbol: 'TRON',
  },
  fiat: {
    uuid: 'bcbbc8a7-e02e-45f6-8a9a-90a7c9bab7c9',
    symbol: '€',
    code: 'EUR',
    enabled: true,
  },
  crypto: {
    uuid: '9126d383-cd78-444f-9482-b5c33b4e552a',
    name: 'USDT',
    symbol: 'USDT',
    icon: 'USDT',
    contract: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    decimal: 6,
    chain: 1,
  },
};

export enum CryptoFormTabs {
  BUY = 'buy',
  EXCHANGE = 'exchange',
}

export enum CryptoFormFieldAction {
  BUY = 'buy',
  SELL = 'sell',
}

export enum PaymentMethod {
  CRYPTO = 'crypto',
  FIAT = 'fiat',
}

export enum DashboardTabs {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  EXCHANGE = 'exchange',
  TRANSACTIONS = 'transactions',
}

export enum WalletTypeValues {
  PERSONAL = 'personal',
  P2P = 'p2p',
  ESCROW = 'escrow',
  MERCHANT = 'merchant',
  EXCHANGE = 'exchange',
  STAKING = 'staking',
  VAULT = 'vault',
}

export const walletType: WalletType = {
  personal: { value: WalletTypeValues.PERSONAL, label: 'Personal' },
  p2p: { value: 'p2p', label: 'P2P' },
  escrow: { value: WalletTypeValues.ESCROW, label: 'Escrow' },
  merchant: { value: WalletTypeValues.MERCHANT, label: 'Merchant' },
  exchange: { value: WalletTypeValues.EXCHANGE, label: 'Exchange' },
  staking: { value: WalletTypeValues.STAKING, label: 'Staking' },
  vault: { value: WalletTypeValues.VAULT, label: 'Vault' },
};

export const defaultUpdateInterval = 10000;

export const defaultPaginationParams = {
  limit: 20,
  offset: 0,
  isLastPage: false,
};

export const emptyStoreDataWithStatus = {
  status: RequestStatus.NONE,
  data: null,
};

export enum CalcType {
  ONRAMP = 'onramp',
  OFFRAMP = 'offramp',
  WITHDRAWAL = 'withdrawal',
}

export enum ModalNames {
  KYC = 'kyc',
}

export enum KYCStatuses {
  APPROVED = 'APROVED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
  HOLD = 'HOLD',
  DOUBLE = 'DOUBLE',
  SOFT_REJECT = 'SOFT_REJECT',
  REJECT = 'REJECT',
  UNVERIFIED = 'UNVERIFIED',
}

export const retryKYCStatuses = [KYCStatuses.DOUBLE, KYCStatuses.HOLD, KYCStatuses.SOFT_REJECT];
export const requestKYCStatuses = [...retryKYCStatuses, KYCStatuses.UNVERIFIED];
