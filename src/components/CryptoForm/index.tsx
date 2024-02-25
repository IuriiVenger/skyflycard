'use client';

import { Button, Card, Tab, Tabs } from '@nextui-org/react';

import cx from 'classnames';

import { FC, useState } from 'react';

import CryptoFormField from './CryptoFormField';

import { API } from '@/api/types';
import { CryptoFormFieldAction, CryptoFormTabs } from '@/constants';
import { isCrypto } from '@/utils/currencies';

type CryptoFormTabsType = {
  [key in CryptoFormTabs]: {
    tabTitle: string;
    clickButtonHandler: () => void;
    getButtonTitle: (currency: string) => string;
    key: CryptoFormTabs;
  };
};

type CryptoFormProps = {
  selectCrypto: (crypto: API.List.Crypto) => void;
  selectFiat: (fiat: API.List.Fiat) => void;
  createFiatOrder: (requestData: API.Orders.OnRamp.Request) => Promise<void | null>;
  selectedCrypto: API.List.Crypto;
  selectedFiat: API.List.Fiat;
  cryptoList: API.List.Crypto[];
  fiatList: API.List.Fiat[];
  fiatExchangeRate: API.Exchange.Fiat2Crypto[];
  activeWallet: API.Wallets.Wallet;
  className?: string;
};

const CryptoForm: FC<CryptoFormProps> = (props) => {
  const {
    selectedCrypto,
    selectedFiat,
    cryptoList,
    fiatList,
    fiatExchangeRate,
    selectCrypto,
    selectFiat,
    className,
    createFiatOrder,
    activeWallet,
  } = props;

  const { href } = window.location;
  const return_url = `${href}dashboard`;

  const activeFiatExchange = fiatExchangeRate.find((rate) => rate.crypto_uuid === selectedCrypto.uuid);
  const activeFiatMinSellSumm = activeFiatExchange?.amountFrom || 0;

  const [sellValue, setSellValue] = useState(activeFiatMinSellSumm || 0);
  const [buyValue, setBuyValue] = useState(0);

  const cryptoFormTabs: CryptoFormTabsType = {
    [CryptoFormTabs.BUY]: {
      tabTitle: 'Buy',
      clickButtonHandler: () =>
        createFiatOrder({
          amount: sellValue,
          fiat_uuid: selectedFiat?.uuid,
          crypto_uuid: selectedCrypto?.uuid,
          wallet_uuid: activeWallet?.uuid,
          return_url_fail: return_url,
          return_url_pending: return_url,
          return_url_success: return_url,
        }),
      getButtonTitle: (currency: string) => `Buy ${currency} now`,
      key: CryptoFormTabs.BUY,
    },
    [CryptoFormTabs.EXCHANGE]: {
      tabTitle: 'Exchange',
      clickButtonHandler: () => console.log('Exchange'),
      getButtonTitle: (currency: string) => `Exchange ${currency} now`,
      key: CryptoFormTabs.EXCHANGE,
    },
  };

  const [activeTabKey, setActiveTabKey] = useState<CryptoFormTabs>(cryptoFormTabs.buy.key);

  const activeFiatExchangeRate = activeFiatExchange?.rate || 0;
  const activeFiatExchangeFee = activeFiatExchange?.fee || 0;
  const potentialSellValue = (sellValue - activeFiatExchangeFee) * activeFiatExchangeRate;
  const buyingCryptoValue = potentialSellValue > 0 ? potentialSellValue : 0;

  const selectCurrency = (currency: API.List.Crypto | API.List.Fiat) =>
    isCrypto(currency) ? selectCrypto(currency) : selectFiat(currency);

  const checkMinSellvalue = () => sellValue <= activeFiatMinSellSumm && setSellValue(activeFiatMinSellSumm);

  return (
    <Card className={cx('w-full max-w-xl px-10 py-8', className)}>
      <Tabs
        selectedKey={activeTabKey}
        onSelectionChange={(key) => {
          setActiveTabKey(key as CryptoFormTabs);
        }}
        variant="solid"
        aria-label="Options"
        fullWidth
        className="mb-4"
        radius="sm"
      >
        <Tab key={cryptoFormTabs.buy.key} title={cryptoFormTabs.buy.tabTitle} className="flex flex-col gap-3">
          <CryptoFormField
            action={CryptoFormFieldAction.SELL}
            currency={selectedFiat}
            currencies={fiatList}
            setValue={setSellValue}
            minValue={activeFiatMinSellSumm}
            value={sellValue}
            onInputBlur={checkMinSellvalue}
            onChangeCurrency={selectCurrency}
          />
          <CryptoFormField
            action={CryptoFormFieldAction.BUY}
            currency={selectedCrypto}
            currencies={cryptoList}
            value={buyingCryptoValue}
            onChangeCurrency={selectCurrency}
          />
        </Tab>
        <Tab
          key={cryptoFormTabs.exchange.key}
          title={cryptoFormTabs.exchange.tabTitle}
          className="flex flex-col gap-3"
          isDisabled
        >
          <CryptoFormField
            action={CryptoFormFieldAction.SELL}
            currency={selectedCrypto}
            currencies={cryptoList}
            setValue={setSellValue}
            value={sellValue}
            onChangeCurrency={selectCurrency}
          />
          <CryptoFormField
            action={CryptoFormFieldAction.BUY}
            currency={cryptoList[1]}
            currencies={cryptoList}
            setValue={setBuyValue}
            value={buyValue}
            onChangeCurrency={selectCurrency}
          />
        </Tab>
      </Tabs>
      <Button
        radius="sm"
        color="success"
        size="lg"
        className="mt-2 w-full font-medium text-white"
        onClick={cryptoFormTabs[activeTabKey].clickButtonHandler}
      >
        {cryptoFormTabs[activeTabKey].getButtonTitle(selectedCrypto.name)}
      </Button>
    </Card>
  );
};

export default CryptoForm;
