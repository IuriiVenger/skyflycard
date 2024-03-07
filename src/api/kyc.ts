import { API } from './types';

import { postRequest } from '.';

export const kyc = {
  sumsub: {
    generate_token: (userId: string) =>
      postRequest<API.KYC.Sumsub.GenerateToken.Response>('/kyc/sumsub/generate_token', { data: { userId } }),
  },
};
