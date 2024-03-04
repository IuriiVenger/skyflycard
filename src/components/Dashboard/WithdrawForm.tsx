import { Button, Input } from '@nextui-org/react';
import cx from 'classnames';
import { FC, useEffect, useState } from 'react';

import { FaCreditCard } from 'react-icons/fa6';

import { TbCurrency } from 'react-icons/tb';

import SelectCurrency from '../Currency/SelectCurrency';

import ExchangeInput from './ExchangeInput';
import SelectPaymentMethod from './SelectPaymentMethod';

import { API } from '@/api/types';
import CurrencyListModal from '@/components/modals/CurrencyListModal';
import { PaymentMethod } from '@/constants';
import useExchange from '@/hooks/useExchange';
import { isCrypto, isFiat } from '@/utils/financial';

type WithdrawFormProps = {
  className?: string;
  selectedFiat: API.List.Fiat;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectedCrypto: API.List.Crypto;
  selectCrypto: (crypto: API.List.Crypto) => void;
  fiatList: API.List.Fiat[];
  cryptoList: API.List.Crypto[];
  chainList: API.List.Chains[];
  exchangeRate: API.Exchange.Fiat2Crypto[];
  selectedWallet: API.Wallets.Wallet | null;
  createCrypto2FiatOrder: (requestData: API.Orders.OffRamp.Request) => Promise<void | null>;
  createCrypto2CryptoOrder: (requestData: API.Orders.Crypto.Withdrawal.Request) => Promise<void | null>;
};

const WithdrawForm: FC<WithdrawFormProps> = (props) => {
  const {
    selectedWallet,
    className,
    selectCrypto,
    selectFiat,
    selectedCrypto,
    selectedFiat,
    fiatList,
    cryptoList,
    exchangeRate,
    createCrypto2FiatOrder,
    createCrypto2CryptoOrder,
    chainList,
  } = props;

  const [isFiatModalOpen, setIsFiatModalOpen] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<PaymentMethod>(PaymentMethod.FIAT);
  const [withdrawTarget, setWithdrawTarget] = useState('');
  const [withdrawCryptoValue, setWithdrawCryptoValue] = useState('');

  const exchangeData = useExchange(exchangeRate, selectedCrypto);
  const { sellValue } = exchangeData;

  const isFiatPayment = activePaymentMethod === PaymentMethod.FIAT;

  const selectedWalletBalance = selectedWallet?.balance;
  const selectedCryptoWalletBalance =
    selectedWalletBalance?.find((balance) => balance.crypto.uuid === selectedCrypto.uuid)?.amount || 0;

  const openCryptoModal = () => setIsCryptoModalOpen(true);
  const openFiatModal = () => setIsFiatModalOpen(true);

  const handleWithdrawTargetInput = (e: React.ChangeEvent<HTMLInputElement>) => setWithdrawTarget(e.target.value);

  const clickButtonHandler = () => {
    if (!selectedWallet) return;

    if (isFiatPayment) {
      return createCrypto2FiatOrder({
        amount: sellValue,
        fiat_uuid: selectedFiat?.uuid,
        crypto_uuid: selectedCrypto?.uuid,
        wallet_uuid: selectedWallet?.uuid,
        card_number: withdrawTarget,
      });
    }

    return createCrypto2CryptoOrder({
      amount: Number(withdrawCryptoValue),
      crypto_uuid: selectedCrypto.uuid,
      wallet_uuid: selectedWallet.uuid,
      to: withdrawTarget,
    });
  };

  const selectCurrency = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => {
    if (isFiat(currency)) {
      selectFiat(currency);
    }
    if (isCrypto(currency)) {
      selectCrypto(currency);
    }
  };

  useEffect(() => {
    // logic to get the active crypto chain
  }, [activePaymentMethod]);

  return (
    <div className={cx('flex flex-col gap-8 md:mt-6', className)}>
      <SelectPaymentMethod
        isWithdraw
        label="Choose withdraw method"
        className="w-full"
        activePaymentMethod={activePaymentMethod}
        onSelect={setActivePaymentMethod}
      />
      <SelectCurrency
        label="Withdraw from"
        onClick={openCryptoModal}
        currency={selectedCrypto}
        balance={selectedCryptoWalletBalance}
        chains={chainList}
      />
      {isFiatPayment && <SelectCurrency label="Withdraw to" onClick={openFiatModal} currency={selectedFiat} />}

      <Input
        className="-mt-4"
        label={isFiatPayment ? 'Card number' : <h3 className="mb-4 text-xl font-bold">Withdraw to</h3>}
        placeholder={isFiatPayment ? 'Enter card number' : 'Enter wallet address'}
        size="lg"
        labelPlacement={isFiatPayment ? 'inside' : 'outside'}
        startContent={isFiatPayment ? <FaCreditCard /> : <TbCurrency />}
        onChange={handleWithdrawTargetInput}
        value={withdrawTarget}
      />

      {isFiatPayment ? (
        <ExchangeInput
          buyingCurrency={selectedFiat}
          sellingCurrency={selectedCrypto}
          exchangeData={exchangeData}
          isWithdraw
        />
      ) : (
        <Input
          className="-mt-4"
          type="number"
          placeholder="Enter amount"
          size="lg"
          labelPlacement="outside"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-small text-default-400">{selectedCrypto.icon}</span>
            </div>
          }
          value={withdrawCryptoValue}
          onChange={(e) => setWithdrawCryptoValue(e.target.value)}
        />
      )}

      <Button size="lg" color="success" className="mt-6 text-white" radius="sm" onClick={clickButtonHandler}>
        Withdraw
      </Button>

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
    </div>
  );
};

export default WithdrawForm;
