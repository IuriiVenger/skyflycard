import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ExternalExhangeInput from '../ExternalExchangeInput';

import { CardsListProps } from './CardsList';
import BinInfo from './CardsList/BinInfo';

import { API } from '@/api/types';
import SelectCurrency from '@/components/Currency/SelectCurrency';
import ConfirmModal from '@/components/modals/ConfirmModal';
import CurrencyListModal from '@/components/modals/CurrencyListModal';
import { framerMotionAnimations } from '@/config/animations';
import { isCrypto, isFiat } from '@/utils/financial';

type CreateCardModalProps = CardsListProps & {
  setIsModalOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  onCardCreate?: (card_id: string) => void;
};

const CreateCardModal: FC<CreateCardModalProps> = (props) => {
  const {
    allowedCryptoToFiatList,
    bins,
    createCard,
    selectedWallet,
    className,
    selectCrypto,
    selectFiat,
    selectedCrypto,
    selectedFiat,
    fiatList,
    chainList,
    externalCalcData,
    setIsModalOpen,
    isOpen,
    onCardCreate,
  } = props;

  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [activeBin, setActiveBin] = useState<API.Cards.Bin>(bins[0]);
  const [cardName, setCardName] = useState<string>('');
  const [topUpConfirmationText, setTopUpConfirmationText] = useState<string | null>(null);

  const { setAmount, amount, offrampCalcData, isOfframpCalcPending } = externalCalcData;

  const selectedWalletBalance = selectedWallet.data?.balance;
  const selectedCryptoWalletBalance =
    selectedWalletBalance?.find((balance) => balance.crypto.uuid === selectedCrypto.uuid)?.amount || 0;
  const selectedCryptoAvavilibleToWithdraw =
    selectedWallet.data &&
    selectedWallet.data.balance.find((balance) => balance.crypto.uuid === selectedCrypto.uuid)?.amount;

  const isAmountEnough = selectedCryptoAvavilibleToWithdraw && selectedCryptoAvavilibleToWithdraw >= amount;
  const isTopUpAvailable = !!selectedCrypto && !!selectedFiat && !!selectedWallet.data && !!amount && isAmountEnough;

  const selectCurrency = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => {
    if (isFiat(currency)) {
      selectFiat(currency);
    }
    if (isCrypto(currency)) {
      selectCrypto(currency);
    }
  };

  const openCryptoModal = () => setIsCryptoModalOpen(true);

  const openConfirmationModal = () => {
    const confirmationText = `Are you sure you want to create card and top up it with ${amount} ${selectedCrypto.symbol}?`;

    setTopUpConfirmationText(confirmationText);
    setIsConfirmationModalOpen(true);
  };

  const createCardHandler = async () => {
    if (!selectedWallet.data) {
      return;
    }

    const requestData: API.Cards.Create.Request = {
      binCode: activeBin.code,
      cardName,
      wallet_uuid: selectedWallet.data.uuid,
      cardBalance: amount,
    };

    const { data } = await createCard(requestData);
    setIsModalOpen(false);
    toast.success('Card created successfully');
    onCardCreate && onCardCreate(data.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const setCardFiatCurrency = () => {
    const cardCurrency = fiatList.find((fiat) => fiat.code === activeBin.currencyCode);

    if (cardCurrency) {
      selectFiat(cardCurrency);
    } else {
      closeModal();
      toast.error('Card currency not found');
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bin = bins.find((item) => item.code === e.target.value);
    if (!bin) {
      return;
    }
    setActiveBin(bin);
  };

  useEffect(() => {
    setCardFiatCurrency();
    setAmount(0);
  }, [activeBin]);

  return (
    <Modal
      motionProps={{
        variants: framerMotionAnimations.downEnterExit,
      }}
      isOpen={isOpen}
      onOpenChange={setIsModalOpen}
      hideCloseButton
      backdrop="opaque"
    >
      <ModalContent>
        <ModalHeader>Create card</ModalHeader>
        <ModalBody>
          <div className={cn('flex flex-col gap-4', className)}>
            <Select label="Select BIN" onChange={handleSelectChange} selectedKeys={[activeBin.code]}>
              {bins.map((bin) => (
                <SelectItem
                  key={bin.code}
                  onClick={() => setActiveBin(bin)}
                  value={bin.code}
                  className="border-b border-gray-200 p-2 text-xs"
                  textValue={`${bin.code}, ${bin.provider}, ${bin.currencyCode}`}
                >
                  <BinInfo bin={bin} />
                </SelectItem>
              ))}
            </Select>
            <Input
              label="Card name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Enter card name"
            />
            <SelectCurrency
              label="Top Up from"
              labelClassName="!text-base font-medium mb-2"
              onClick={openCryptoModal}
              currency={selectedCrypto}
              balance={selectedCryptoWalletBalance}
              chains={chainList}
            />

            <ExternalExhangeInput
              externalLabel="Top Up amount"
              buyingCurrency={selectedFiat}
              sellingCurrency={selectedCrypto}
              calcData={offrampCalcData}
              sellValue={amount}
              setSellValue={setAmount}
              isCalculating={isOfframpCalcPending}
              isWithdraw
            />

            <CurrencyListModal
              isOpen={isCryptoModalOpen}
              setIsModalOpen={setIsCryptoModalOpen}
              activeCurrency={selectedCrypto}
              currencies={allowedCryptoToFiatList}
              onSelect={selectCurrency}
              chains={chainList}
            />

            <ConfirmModal
              isOpen={isConfirmationModalOpen}
              setIsModalOpen={setIsConfirmationModalOpen}
              onConfirm={createCardHandler}
              title="Top Up confirmation"
              confirmText={topUpConfirmationText}
            />
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col">
          <Button isDisabled={!isTopUpAvailable} color="primary" radius="md" onClick={openConfirmationModal}>
            {isAmountEnough ? 'Create card' : 'Not enough funds'}
          </Button>
          <Button onClick={closeModal} className="w-full" color="primary" variant="bordered">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCardModal;
