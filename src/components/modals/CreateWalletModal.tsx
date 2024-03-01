import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { FC, useState } from 'react';

import { WalletTypeValues } from '@/constants';
import { ValueWithLabel } from '@/types';

type CreateWalletProps = {
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: (walletType: WalletTypeValues) => Promise<void>;
  isOpen: boolean;
  walletTypes: ValueWithLabel[];
};

const CreateWalletModal: FC<CreateWalletProps> = (props) => {
  const { onOpenChange, onConfirm, isOpen, walletTypes } = props;
  const [selectedWalletType, setSelectedWalletType] = useState<WalletTypeValues | undefined>(undefined);
  const [isWalletCreating, setIsWalletCreating] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWalletType(e.target.value as WalletTypeValues);
  };

  const handleClose = () => onOpenChange(false);

  const handleCreateWallet = async () => {
    if (selectedWalletType) {
      try {
        setIsWalletCreating(true);
        await onConfirm(selectedWalletType);
        handleClose();
      } finally {
        setIsWalletCreating(false);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation>
      <ModalContent>
        <ModalHeader>Create Wallet</ModalHeader>
        <ModalBody>
          <Select
            label="Select wallet type"
            className="max-w-xs"
            onChange={handleSelectChange}
            selectedKeys={selectedWalletType && [selectedWalletType]}
          >
            {walletTypes.map((walletType) => (
              <SelectItem key={walletType.value} value={walletType.value}>
                {walletType.label}
              </SelectItem>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            className="text-white"
            color="success"
            isDisabled={!selectedWalletType}
            isLoading={isWalletCreating}
            onClick={handleCreateWallet}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateWalletModal;
