import { Button } from '@nextui-org/react';
import cx from 'classnames';
import { FC, useState } from 'react';

import { CiCirclePlus } from 'react-icons/ci';
import { LiaWalletSolid } from 'react-icons/lia';

import { API } from '@/api/types';
import CreateWalletModal from '@/components/modals/CreateWalletModal';
import { WalletTypeValues } from '@/constants';
import { ValueWithLabel } from '@/types';
import { getWalletTypeLabel } from '@/utils/helpers';

type WalletMenuProps = {
  wallets: API.Wallets.Wallet[];
  walletTypes: ValueWithLabel[];
  onSelect: (wallet_uuid: string) => void;
  activeWallet: API.Wallets.Wallet | null;
  className?: string;
  createWallet: (wallet_type: WalletTypeValues) => Promise<void>;
};

const WalletList: FC<WalletMenuProps> = ({ wallets, onSelect, activeWallet, className, createWallet, walletTypes }) => {
  const [isCreateWalletModalOpen, setIsCreateWalletModalOpen] = useState(false);

  const openCreateWalletModal = () => setIsCreateWalletModalOpen(true);

  return (
    <section className={cx('flex flex-col gap-1', className)}>
      <h3 className="mb-4 text-xl font-bold">Wallets</h3>
      {wallets.map((wallet) => (
        <div
          className={cx(
            'flex cursor-pointer items-center gap-4 rounded-lg px-4 py-2 transition-background',
            wallet.uuid === activeWallet?.uuid ? 'bg-gray-200' : 'hover:bg-gray-100',
          )}
          key={wallet.uuid}
          onClick={() => onSelect(wallet.uuid)}
        >
          <LiaWalletSolid className="mb-1 mr-2 text-3xl" />
          <div className="font-medium">
            <span className="mr-1 capitalize">{getWalletTypeLabel(wallet.type)}</span>
          </div>
        </div>
      ))}
      <Button
        className="mt-2 w-fit self-center text-black"
        color="success"
        onClick={openCreateWalletModal}
        variant="light"
        radius="sm"
      >
        Create new wallet <CiCirclePlus />
      </Button>
      <CreateWalletModal
        isOpen={isCreateWalletModalOpen}
        onOpenChange={setIsCreateWalletModalOpen}
        onConfirm={createWallet}
        walletTypes={walletTypes}
      />
    </section>
  );
};

export default WalletList;
