export namespace API {
  export namespace Auth {
    export interface Tokens {
      access_token: string;
      refresh_token: string;
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
