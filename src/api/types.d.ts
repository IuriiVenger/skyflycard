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
  }

  export namespace List {
    export interface Fiat {
      uuid: string;
      symbol: string;
      code: string;
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
      created_at: string;
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
      balance: WalletBalance[];
    }
  }

  export namespace Orders {
    export namespace OnRamp {
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
        return_url: string;
      }
      export type Response = Item;
    }
  }
}
