export namespace API {
  export namespace Auth {
    export interface Tokens {
      access_token: string;
      refresh_token: string;
    }
  }

  export namespace Exchange {
    export interface Fiat2Crypto {
      id: number;
      created_at: string;
      fiat_uuid: string;
      crypto_uuid: string;
      rate: number;
      inverted_rate: number;
      fee: number;
      amountFrom: number;
    }

    export interface Crypto2Crypto {
      id: number;
      created_at: string;
      from_crypto_uuid: string;
      to_crypto_uuid: string;
      rate: number;
      inverted_rate: number;
      fee: number;
      amountFrom: number;
    }
  }

  export namespace List {
    export interface Fiat {
      uuid: string;
      symbol: string;
      code: string;
      enabled: boolean;
    }
    export interface Crypto {
      uuid: string;
      name: string;
      symbol: string;
      icon: string;
      contract: string;
      decimal: number;
      chain: number;
    }

    export interface Chains {
      id: number;
      enabled: boolean;
      name: string;
      symbol: string;
    }
  }

  export namespace Wallets {
    export interface WalletBalance {
      uuid: string;
      amount: number;
      crypto: List.Crypto;
    }

    export interface Wallet {
      created_at: string;
      user_id: string;
      uuid: string;
      type: string;
      base_fiat: string;
      balance: WalletBalance[];
    }

    export namespace WalletChain {
      export interface Request {
        wallet_uuid: string;
        chain: number;
        label: string;
      }
      export interface Response {
        uuid: string;
        created_ad: string;
        address: string;
        wallet_uuid: string;
        chain: number;
      }
    }

    export interface ExtendWallet extends Wallet {
      total_amount: number;
    }

    export namespace Address {
      export interface Item {
        id: number;
        created_at: string;
        wallet_uuid: string;
        chain: string;
        address: string;
      }
      export interface Request {
        chain: string;
        wallet_uuid: string;
        type: string;
        label: string;
      }
      export type Response = Item;
    }
  }

  export namespace Orders {
    export namespace OnRamp {
      export namespace Calc {
        export interface Item {
          provider_uuid: string;
          crypto_uuid: string;
          fiat_uuid: string;
          rate: number;
          inverted_rate: number;
          commission: number;
          amount_fiat: number;
          amount_crypto: number;
          kyc_required: boolean;
          ttl: string;
        }
        export interface Request {
          amount: number;
          crypto_uuid: string;
          fiat_uuid: string;
          wallet_uuid: string;
          is_subtract: boolean;
        }
        export type Response = Item[];
      }
      export interface Item {
        id: number;
        created_at: string;
        order_uuid: string;
        wallet_uuid: string;
        fiat_uuid: string;
        crypto_uuid: string;
        amount_fiat: number;
        payment_method: string;
        redirect_url: string;
        status: string;
        provider_uuid: string;
      }
      export interface Request {
        amount: number;
        fiat_uuid: string;
        wallet_uuid: string;
        crypto_uuid: string;
        return_url_success: string;
        return_url_fail: string;
        return_url_pending: string;
      }
      export type Response = Item;
    }

    export namespace OffRamp {
      export namespace Calc {
        export interface Item {
          provider_uuid: string;
          crypto_uuid: string;
          fiat_uuid: string;
          rate: number;
          inverted_rate: number;
          commission: number;
          amount_fiat: number;
          amount_crypto: number;
          kyc_required: boolean;
          ttl: string;
        }

        export interface Request {
          amount: number;
          crypto_uuid: string;
          fiat_uuid: string;
          wallet_uuid: string;
          is_subtract: boolean;
        }

        export type Response = Item[];
      }
      export interface Item {
        id: number;
        created_at: string;
        order_uuid: string;
        wallet_uuid: string;
        fiat_uuid: string;
        crypto_uuid: string;
        amount_fiat: number;
        payment_method: string;
        card_number: string;
        status: string;
        provider_uuid: string;
      }
      export interface Request {
        amount: number;
        wallet_uuid: string;
        crypto_uuid: string;
        fiat_uuid: string;
        card_number: string;
      }
      export type Response = Item;
    }

    export namespace Crypto {
      export namespace Withdrawal {
        export namespace Calc {
          export interface Item {
            commission: number;
            net_amount: number;
            total_amount: number;
            ttl: string;
          }
          export interface Request {
            address: string;
            amount: number;
            crypto_uuid: string;
            wallet_uuid: string;
            is_subtract: boolean;
          }

          export interface Response {
            [key: string]: Item;
          }
        }

        export interface Item {
          id: number;
          created_at: string;
          order_uuid: string;
          wallet_uuid: string;
          crypto_uuid: string;
          amount: number;
          status: string;
          network: string;
          to: string;
          txid: string;
        }
        export interface Request {
          amount: number;
          wallet_uuid: string;
          crypto_uuid: string;
          to: string;
        }
        export type Response = Item;
      }
    }
  }

  export namespace Transactions {
    export interface Transaction {
      id: number;
      created_at: string;
      type: string;
      status: string;
      amount: number;
      from: string;
      to: string;
      wallet_id: string;
      crypto_id: string;
      txid: string;
      info: string;
    }
  }
}
