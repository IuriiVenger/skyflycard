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
  fiat: {
    uuid: 'bcbbc8a7-e02e-45f6-8a9a-90a7c9bab7c9',
    symbol: '€',
    code: 'EUR',
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

export enum CryptoFormFieldAction {
  BUY = 'buy',
  SELL = 'sell',
}

export enum CurrencyType {
  CRYPTO = 'crypto',
  FIAT = 'fiat',
}
