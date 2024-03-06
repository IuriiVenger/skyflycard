import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import SelectCurrency from '../Currency/SelectCurrency';
import CurrencyListModal from '../modals/CurrencyListModal';

import ChainInfo from './ChainInfo';

import ExternalExhangeInput from './ExternalExchangeInput';
import SelectPaymentMethod from './SelectPaymentMethod';

import { API } from '@/api/types';
import { PaymentMethod, ResponseStatus } from '@/constants';
import useExchange from '@/hooks/useExchange';
import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { isChain, isCrypto, isFiat } from '@/utils/financial';

type DepositFormProps = {
  className?: string;
  selectedChain: API.List.Chains;
  selectChain: (chain: API.List.Chains) => void;
  selectedFiat: API.List.Fiat;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectedCrypto: API.List.Crypto;
  selectCrypto: (crypto: API.List.Crypto) => void;
  fiatList: API.List.Fiat[];
  cryptoList: API.List.Crypto[];
  chainList: API.List.Chains[];
  externalCalcData: UseExternalCalcData;
  selectedWallet: API.Wallets.Wallet | null;
  getWalletAddress: (chain: number, wallet_uuid: string) => Promise<API.Wallets.WalletChain.Response>;
  createFiat2CryptoOrder: (requestData: API.Orders.OnRamp.Request) => Promise<void | null>;
  createWalletAddress: (data: API.Wallets.WalletChain.Request) => Promise<API.Wallets.WalletChain.Response>;
};

const DepositForm: FC<DepositFormProps> = (props) => {
  const {
    selectedWallet,
    className,
    selectChain,
    selectedChain,
    selectCrypto,
    selectFiat,
    selectedCrypto,
    selectedFiat,
    fiatList,
    cryptoList,
    chainList,
    createFiat2CryptoOrder,
    getWalletAddress,
    createWalletAddress,
    externalCalcData,
  } = props;

  const { setAmount, amount, onrampCalcData, isOnrampCalcPending } = externalCalcData;

  const [isFiatModalOpen, setIsFiatModalOpen] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
  const [isChainModalOpen, setIsChainModalOpen] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<PaymentMethod>(PaymentMethod.FIAT);
  const [activeWalletAddress, setActiveWalletAddress] = useState<API.Wallets.WalletChain.Response | null>(null);
  const [isWalletAdressLoading, setIsWalletAdressLoading] = useState(false);

  const openCryptoModal = () => setIsCryptoModalOpen(true);
  const openFiatModal = () => setIsFiatModalOpen(true);
  const openChainModal = () => setIsChainModalOpen(true);

  const return_url = `${window.location.origin}/dashboard`;

  const clickButtonHandler = () =>
    selectedWallet &&
    createFiat2CryptoOrder({
      amount,
      fiat_uuid: selectedFiat?.uuid,
      crypto_uuid: selectedCrypto?.uuid,
      wallet_uuid: selectedWallet?.uuid,
      return_url_fail: return_url,
      return_url_pending: return_url,
      return_url_success: return_url,
    });

  const selectCurrency = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => {
    if (isChain(currency)) {
      selectChain(currency);
    }
    if (isFiat(currency)) {
      selectFiat(currency);
    }
    if (isCrypto(currency)) {
      selectCrypto(currency);
    }
  };

  const loadChain = async () => {
    if (selectedWallet) {
      try {
        setActiveWalletAddress(null);
        setIsWalletAdressLoading(true);
        const walletChain = await getWalletAddress(selectedChain.id, selectedWallet.uuid);
        setActiveWalletAddress(walletChain);
      } catch (error) {
        if ((error as any).response?.status === ResponseStatus.NOT_FOUND) {
          // eslint-disable-next-line no-console
          return console.log('Address not found');
        }
        throw error;
      } finally {
        setIsWalletAdressLoading(false);
      }
    }
  };

  const createWalletAddressHandler = async () => {
    if (selectedWallet) {
      try {
        setIsWalletAdressLoading(true);
        await createWalletAddress({ chain: selectedChain.id, wallet_uuid: selectedWallet.uuid, label: 'default' });
        await loadChain();
      } finally {
        setIsWalletAdressLoading(false);
      }
    }
  };

  useEffect(() => {
    if (activePaymentMethod === PaymentMethod.CRYPTO) {
      loadChain();
    }
  }, [activePaymentMethod, selectedWallet?.uuid, selectedChain]);

  return (
    <div className={cn('flex flex-col gap-8 md:mt-6', className)}>
      <SelectPaymentMethod
        label="Choose payment method"
        className="w-full"
        activePaymentMethod={activePaymentMethod}
        onSelect={setActivePaymentMethod}
      />
      {activePaymentMethod === PaymentMethod.FIAT && (
        <>
          <SelectCurrency label="Deposit by" onClick={openFiatModal} currency={selectedFiat} />
          <SelectCurrency label="Deposit to" onClick={openCryptoModal} currency={selectedCrypto} chains={chainList} />
          <ExternalExhangeInput
            buyingCurrency={selectedCrypto}
            sellingCurrency={selectedFiat}
            calcData={onrampCalcData}
            sellValue={amount}
            setSellValue={setAmount}
            isCalculating={isOnrampCalcPending}
          />
          <Button size="lg" color="success" className="mt-6 text-white" radius="sm" onClick={clickButtonHandler}>
            Buy
          </Button>
        </>
      )}
      {activePaymentMethod === PaymentMethod.CRYPTO && (
        <>
          <SelectCurrency label="Deposit by" onClick={openChainModal} currency={selectedChain} />
          <ChainInfo
            isWalletAdressLoading={isWalletAdressLoading}
            selectedAddress={activeWalletAddress}
            createAddress={createWalletAddressHandler}
          />
        </>
      )}

      <CurrencyListModal
        isOpen={isFiatModalOpen}
        onOpenChange={setIsFiatModalOpen}
        activeCurrency={selectedFiat}
        currencies={fiatList}
        onSelect={selectCurrency}
      />
      <CurrencyListModal
        isOpen={isCryptoModalOpen}
        onOpenChange={setIsCryptoModalOpen}
        activeCurrency={selectedCrypto}
        currencies={cryptoList}
        onSelect={selectCurrency}
        chains={chainList}
      />
      <CurrencyListModal
        isOpen={isChainModalOpen}
        onOpenChange={setIsChainModalOpen}
        activeCurrency={selectedChain}
        currencies={chainList}
        onSelect={selectCurrency}
      />
    </div>
  );
};

export default DepositForm;
