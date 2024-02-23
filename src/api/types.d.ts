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
}
