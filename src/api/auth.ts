import { API } from './types';

import { getRequest, postRequest } from '.';

export const auth = {
  refresh: {
    refresh_token: (refresh_token: string) =>
      postRequest<API.Auth.Tokens>('/auth/refresh/refresh_token', { data: { refresh_token } }),
  },
  user_data: () => getRequest<API.Auth.UserData>('/auth/user_data'),
};
