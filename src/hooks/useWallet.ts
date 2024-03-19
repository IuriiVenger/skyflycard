import { API } from '@/api/types';
import { wallets } from '@/api/wallets';
import { setSelectedWallet, setUserWallets } from '@/store/slices/finance';
import { AppDispatch } from '@/store/types';

const useWallet = () => {
  const createWalletAddress = async (data: API.Wallets.WalletChain.Request) => wallets.createAddress(data);

  const getWalletAddress = async (chain: number, wallet_uuid: string) => wallets.getAddress(chain, wallet_uuid);

  const loadWallets = async (dispatch: AppDispatch) => {
    const userWallets = await wallets.getAll();
    dispatch(setUserWallets(userWallets));
    if (userWallets.length) {
      const activeWalletUuid = userWallets[0].uuid;
      const activeWallet = await wallets.getByUuid(activeWalletUuid);
      dispatch(setSelectedWallet(activeWallet));
    }
  };

  const unloadWallets = (dispatch: AppDispatch) => {
    dispatch(setUserWallets([]));
    dispatch(setSelectedWallet(null));
  };

  return { createWalletAddress, getWalletAddress, loadWallets, unloadWallets };
};

export default useWallet;
