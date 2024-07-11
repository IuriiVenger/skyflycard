import { InitData } from '@telegram-apps/sdk-react';

import { API } from './types';

import { getRequest, postRequest } from '.';

export const auth = {
  me: () => getRequest<API.Auth.Me>('/auth/me'),
  signin: {
    email: {
      otp: (email: string) =>
        postRequest<API.Auth.SupabaseGetSessionResponse>('/auth/signin/email/otp', { data: { email } }),
    },
    password: (email: string, password: string) =>
      postRequest<API.Auth.SupabaseGetSessionResponse>('/auth/signin/password', { data: { email, password } }),
  },
  verify: {
    email: {
      otp: (email: string, token: string) =>
        postRequest<API.Auth.VerifyOtp.Response>('/auth/verify/email/otp', { data: { email, token } }),
    },
  },
  signUp: {
    password: (email: string, password: string) =>
      postRequest<API.Auth.SupabaseGetSessionResponse>('/auth/signup/password', { data: { email, password } }),
  },
  refresh: {
    refresh_token: (refresh_token: string) =>
      postRequest<API.Auth.Tokens>('/auth/refresh/refresh_token', { data: { refresh_token } }),
  },
  user_data: () => getRequest<API.Auth.UserData>('/auth/user_data'),
  telegram: {
    signin: (data: API.Auth.Telegram.Signin) =>
      postRequest<API.Auth.SupabaseGetSessionResponse>('/auth/telegram/signin/tg_id', { data }),
    signup: (data: InitData) =>
      postRequest<API.Auth.SupabaseGetSessionResponse>('/auth/telegram/signup/phone', { data }),
  },
};
