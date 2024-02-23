/* eslint-disable import/prefer-default-export */

import { AxiosRequestConfig } from 'axios';

import { API } from './types';

import { getRequest } from '.';

export const list = {
  fiats: {
    getAll: (params?: AxiosRequestConfig) => getRequest<API.List.Fiat[]>('/fiats', params).then(({ data }) => data),
  },
  crypto: {
    getAll: (params?: AxiosRequestConfig) => getRequest<API.List.Crypto[]>('/crypto', params).then(({ data }) => data),
  },
  chains: {
    getAll: (params?: AxiosRequestConfig) => getRequest<API.List.Chains[]>('/chains', params).then(({ data }) => data),
  },
};
