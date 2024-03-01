import { walletType } from '@/constants';

export const getWalletTypeLabel = (type: string) => walletType[type]?.label || type;
