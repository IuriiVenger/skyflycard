import { API } from './types';

import { getRequest, postRequest } from '.';

export const auth = {
  me: () => getRequest<API.Auth.Me>('/auth/me'),
  signin: {
    email: {
      otp: (email: string) =>
        postRequest<API.Auth.SupabaseGetSessionResponse>('/auth/signin/email/otp', { data: { email } }),
    },
  },
  verify: {
    email: {
      otp: (email: string, token: string) =>
        postRequest<API.Auth.VerifyOtp.Response>('/auth/verify/email/otp', { data: { email, token } }),
    },
  },
  refresh: {
    refresh_token: (refresh_token: string) =>
      postRequest<API.Auth.Tokens>('/auth/refresh/refresh_token', { data: { refresh_token } }),
  },
  user_data: () => getRequest<API.Auth.UserData>('/auth/user_data'),
};
