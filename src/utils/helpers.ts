import { getCookie, setCookie } from 'cookies-next';

import { walletType } from '@/constants';

export const getWalletTypeLabel = (type: string) => walletType[type]?.label || type;

export const getStartTimeForTimer = (sec: number, key: string): Date => {
  const startTime = getCookie(key);

  if (!startTime) {
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);

    setCookie(key, new Date().toString(), { expires: time });

    return time;
  }

  const restTime = new Date(`${startTime}`);
  restTime.setSeconds(restTime.getSeconds() + sec);

  return restTime;
};
