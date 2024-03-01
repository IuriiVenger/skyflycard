import { API } from './types';

import { postRequest } from '.';

export const auth = {
  refresh: {
    refresh_token: (refresh_token: string) =>
      postRequest<API.Auth.Tokens>('/auth/refresh/refresh_token', { data: { refresh_token } }),
  },
};
