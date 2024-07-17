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

import ExternalExhangeInput from '../../ExternalExchangeInput';

import BinInfo from './BinInfo';

import { CardsListProps } from '.';

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
      scrollBehavior="outside"
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
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, a? Repellat, incidunt optio? Cupiditate
              eius nihil in cumque ratione omnis at optio tenetur impedit perferendis corporis ullam accusantium, amet
              nesciunt? Voluptate ex corrupti asperiores neque consequuntur voluptates quod ullam inventore ut sit
              exercitationem fuga saepe corporis dolore praesentium amet odit, possimus est similique et natus, itaque
              quisquam molestiae. Illo, et. Qui tenetur fugit rem harum modi culpa, labore cumque atque? Ipsa, commodi.
              Perferendis fuga, eius corrupti minima unde a, quis ipsum dignissimos deserunt est suscipit dicta rerum.
              Aliquid, dolorem rerum! Quos maxime quasi omnis cum doloremque ullam praesentium aliquam optio esse minus
              cupiditate incidunt sed perferendis officia facere asperiores ut, reiciendis et necessitatibus excepturi
              dolor repellat quae aliquid! Reiciendis, dignissimos! Fugit et iusto optio non fugiat! Magnam, repudiandae
              minus aut voluptas ut nesciunt officia doloribus deleniti expedita eaque nihil mollitia consectetur
              laudantium explicabo eum possimus. Adipisci rerum non voluptates facilis! Laboriosam, placeat odio? Maxime
              neque aperiam consequuntur fugiat repellat quasi, quae repellendus quibusdam labore corporis natus sint
              nemo voluptatum praesentium illo exercitationem eius minima reprehenderit excepturi explicabo omnis?
              Atque, consequuntur! Excepturi id maxime repellendus, cum nisi ducimus delectus voluptatibus aliquam nemo,
              corrupti laboriosam quisquam temporibus dignissimos enim, eos ab amet suscipit deleniti maiores et ea
              voluptates! Veritatis laudantium maiores vero. Ut deleniti nostrum aperiam in ducimus porro suscipit iste
              illum. Vitae quaerat voluptatem dignissimos excepturi nobis voluptatum dolorem. Ipsa temporibus autem
              deleniti ut debitis cumque corporis atque, sunt vel quae? Similique, totam? Blanditiis pariatur dolores
              quam! Nostrum quidem at consequuntur incidunt. Ut sequi sint, iusto sapiente adipisci nesciunt laboriosam
              commodi deleniti magnam mollitia sunt rerum ipsam? Autem totam provident modi? Ut eos accusamus distinctio
              earum nisi quas ea iste atque eveniet, reprehenderit ipsam ad consequuntur laborum, sint dolor reiciendis
              id explicabo qui vero dolore! Pariatur, voluptatem dolorem. Ea, officia corporis.
            </p>

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
