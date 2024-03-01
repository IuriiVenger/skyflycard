import { API } from '@/api/types';
import { wallets } from '@/api/wallets';

const useWallet = () => {
  const createWalletAddress = async (data: API.Wallets.WalletChain.Request) => wallets.createAddress(data);

  const getWalletAddress = async (chain: number, wallet_uuid: string) => wallets.getAddress(chain, wallet_uuid);

  return { createWalletAddress, getWalletAddress };
};

export default useWallet;
