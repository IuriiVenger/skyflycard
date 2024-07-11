import { User } from '@supabase/supabase-js';

import { CardTransactionDirection, CardTransationStatus, KYCStatuses, OrderStatuses, OrderTypes } from '@/constants';

export namespace API {
  export namespace Auth {
    export type Me = User;

    export namespace Telegram {
      export interface Signin {
        tg_id: number;
        hash: string;
        init_data_raw: string;
      }
      export interface Signup {
        phone: string;
        tg_id: number;
        first_name: string;
        last_name?: string;
        hash: string;
        init_data_raw: string;
      }
    }

    export interface Tokens {
      access_token: string;
      refresh_token: string;
    }
    export interface UserData {
      id: number;
      created_at: string;
      user_id: string;
      kyc_status: KYCStatuses;
      kyc_date: string;
      turnover_limit?: number;
      default_fiat: string;
      total_turnover: {
        onramp: number;
        offramp: number;
        total: number;
      };
    }
    export interface SupabaseGetSessionResponse {
      session?: Tokens;
      user?: User;
      error?: string;
    }

    export namespace VerifyOtp {
      export type Response = { access_token: string; refresh_token: string; user: User; error?: string };
    }
  }

  export namespace Cards {
    export interface Bin {
      code: string;
      countryCode: string;
      currencyCode: string;
      provider: string;
      billingAddress: string;
      paymentServices: string[];
      merchants: string[];
      purposes: string[];
      fees: {
        issue: {
          feeAmount: number;
          unit: string;
        };
        authorization: {
          minAmount: number;
          maxAmount: number;
          feeAmount: number;
          unit: string;
        }[];
        decline: {
          feeAmount: number;
          unit: string;
        };
        zeroAuth: {
          feeAmount: number;
          unit: string;
        };
      };
      requirements: {
        isKycRequired: boolean;
      };
    }
    export interface User {
      email: string;
      whitelabel: string;
      id: string;
      nickname: string;
      role: string;
      status: string;
      user_type: string;
      invite_accept: boolean;
      is_new_client: boolean;
      account: {
        first_name: string;
        middle_name: string;
        last_name: string;
        date_of_birth: string;
        phone: string;
        type: string;
        id: string;
        user_id: number;
        tg_account: string;
        company: {
          name: string;
          registration_number: string;
          phone: string;
          primary_contact_email: string;
          id: string;
        };
      };
    }

    export interface Limit {
      interval?: string;
      amount: number;
    }

    export interface Limits {
      single: Limit;
      daily: Limit;
      weekly: Limit;
      monthly: Limit;
      lifetime: Limit;
    }

    export interface CardDetailItem {
      status: string;
      cardName: string;
      limits: Limits;
      autoTopUp: {
        thresholdAmount: number;
        topUpAmount: number;
      };
      isFavorite: boolean;
      wallet_id: string;
      walletInfo: {
        id: string;
        code: string;
        purpose: string;
        name: string;
        currencyCode: string;
        availableBalance: number;
      };
      id: string;
      maskedPan: string;
      bin: {
        code: string;
        countryCode: string;
        currencyCode: string;
        provider: string;
        billingAddress: string;
        paymentServices: string[];
        purposes: string[];
        fees: {
          issue: {
            feeAmount: number;
            unit: string;
          };
          authorization: {
            minAmount: number;
            maxAmount: number;
            feeAmount: number;
            unit: string;
          }[];
          decline: {
            feeAmount: number;
            unit: string;
          };
          zeroAuth: {
            feeAmount: number;
            unit: string;
          };
        };
        requirements: {
          isKycRequired: boolean;
        };
      };
      createdAt: string;
      balance: {
        available: number;
        spent: number;
        pending: number;
      };
      user: {
        id: string;
        nickname: string;
        email: string;
      };
      cardId: string;
    }
    export interface CardListItem {
      id: string;
      userId: string;
      walletId: string;
      createdAt: string;
      type: string;
      amount: number;
      availableBalance: number;
      currencyCode: string;
      description: string;
      status: string;
      direction: string;
      user: {
        id: string;
        role: string;
        status: string;
        firstName: string;
        lastName: string;
        nickname: string;
        email: string;
        balance: {
          currencyCode: string;
          available: number;
          reserved: number;
          pending: number;
          total: number;
        };
      };
      walletInfo: {
        id: string;
        code: string;
        name: string;
        currencyCode: string;
      };
      details: {
        binInfo: {
          code: string;
          countryCode: string;
          currencyCode: string;
          provider: string;
        };
        maskedPan: string;
        cardName: string;
      };
    }

    export interface CardsList {
      items: CardDetailItem[];
      totalCount: number;
    }

    export interface TransactionItem {
      id: string;
      userId: string;
      walletId: string;
      createdAt: string;
      type: string;
      amount: number;
      availableBalance: number;
      currencyCode: string;
      description: string;
      status: CardTransationStatus;
      direction: CardTransactionDirection;
      user: {
        id: string;
        role: string;
        status: string;
        firstName: string;
        lastName: string;
        nickname: string;
        email: string;
        balance: {
          currencyCode: string;
          available: number;
          reserved: number;
          pending: number;
          total: number;
        };
      };
      walletInfo: {
        id: string;
        code: string;
        name: string;
        currencyCode: string;
      };
      details: {
        binInfo: {
          code: string;
          countryCode: string;
          currencyCode: string;
          provider: string;
        };
        maskedPan: string;
        cardName: string;
      };
    }

    export interface TransactionsList {
      items: TransactionItem[];
      totalCount: number;
    }

    export interface SensitiveData {
      card_number: string;
      cvv: string;
      expiry_month: number;
      expiry_year: number;
      name_on_card: string;
    }

    export namespace Create {
      export interface Request {
        wallet_uuid: string;
        binCode: string;
        cardName: string;
        limits?: Limits;
        cardBalance: number;
        cardsCount?: number;
        autoTopUp?: {
          thresholdAmount: number;
          topUpAmount: number;
        };
        walletId?: string;
        ownerId?: string;
      }

      export type Response = CardDetailItem;
    }

    export namespace Update {
      export interface Request {
        status: string;
        cardName: string;
        limits: Limits;
        autoTopUp: {
          thresholdAmount: number;
          topUpAmount: number;
        };
      }
    }
  }

  export namespace Exchange {
    export interface F2C {
      crypto_uuid: string;
      crypto_symbol: string;
      fiat_uuid: string;
      fiat_code: string;
      rate: number;
      min_amount: number;
    }

    export interface C2F {
      crypto_uuid: string;
      crypto_symbol: string;
      fiat_uuid: string;
      fiat_code: string;
      rate: number;
      min_amount: number;
    }

    export interface C2C {
      from_uuid: string;
      from_symbol: string;
      to_uuid: string;
      to_symbol: string;
      rate: number;
      min_amount: string;
    }
  }

  export namespace KYC {
    export namespace Sumsub {
      export namespace GenerateToken {
        export interface Request {
          userId: string;
        }
        export interface Response extends Request {
          token: string;
        }
      }
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
          is_subsctract: boolean;
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
        is_subsctract: boolean;
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
          is_subsctract: boolean;
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
        is_subsctract: boolean;
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
            address?: string;
            amount: number;
            crypto_uuid: string;
            wallet_uuid: string;
            is_subsctract: boolean;
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
          to_address: string;
          txid: string;
        }
        export interface Request {
          amount: number;
          wallet_uuid: string;
          crypto_uuid: string;
          to_address: string;
          is_subsctract: boolean;
        }
        export type Response = Item;
      }
    }

    export namespace Status {
      export interface Response {
        id: number;
        created_at: string;
        order_uuid: string;
        wallet_uuid: string;
        crypto_uuid: string;
        status: OrderStatuses;
        amount: number;
        comission: number;
        net_amount: number;
        type: OrderTypes;
      }
    }

    export namespace VCards {
      export namespace Topup {
        export namespace Internal {
          export interface Request {
            amount: number;
            fiat_uuid: string;
            wallet_uuid: string;
            crypto_uuid: string;
            card_id: string;
            is_subsctract: boolean;
          }

          export interface Response {
            id: number;
            created_at: string;
            order_uuid: string;
            wallet_uuid: string;
            fiat_uuid: string;
            crypto_uuid: string;
            amount_fiat: number;
            payment_method: string;
            status: string;
            provider_uuid: string;
            card_number: string;
            amount_crypto: number;
            comission: number;
          }
        }
      }
    }
  }

  export namespace WalletTransactions {
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
      crypto: List.Crypto;
    }
  }
}
