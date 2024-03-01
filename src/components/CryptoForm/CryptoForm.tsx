'use client';

import { Button, Card, Tab, Tabs } from '@nextui-org/react';

import cx from 'classnames';

import { FC, useState } from 'react';

import CryptoFormField from './CryptoFormField';

import { API } from '@/api/types';
import { CryptoFormFieldAction, CryptoFormTabs } from '@/constants';
import { UseExchangeData } from '@/hooks/useExchange';
import { isCrypto, isFiat } from '@/utils/financial';

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
  createFiat2CryptoOrder: (requestData: API.Orders.OnRamp.Request) => Promise<void | null>;
  selectedCrypto: API.List.Crypto;
  selectedFiat: API.List.Fiat;
  cryptoList: API.List.Crypto[];
  fiatList: API.List.Fiat[];
  activeWallet: API.Wallets.Wallet;
  className?: string;
  exchangeData: UseExchangeData;
};

const CryptoForm: FC<CryptoFormProps> = (props) => {
  const {
    selectedCrypto,
    selectedFiat,
    cryptoList,
    fiatList,
    selectCrypto,
    selectFiat,
    className,
    createFiat2CryptoOrder,
    activeWallet,
    exchangeData,
  } = props;

  const { sellValue, setSellValue, buyValue, setBuyValue, fiat2CryptoValue, minSellValue, checkMinSellValue } =
    exchangeData;

  const { origin } = window.location;
  const return_url = `${origin}/dashboard`;

  const cryptoFormTabs: CryptoFormTabsType = {
    [CryptoFormTabs.BUY]: {
      tabTitle: 'Buy',
      clickButtonHandler: () =>
        createFiat2CryptoOrder({
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
      // eslint-disable-next-line no-console
      clickButtonHandler: () => console.log('Exchange'),
      getButtonTitle: (currency: string) => `Exchange ${currency} now`,
      key: CryptoFormTabs.EXCHANGE,
    },
  };

  const [activeTabKey, setActiveTabKey] = useState<CryptoFormTabs>(cryptoFormTabs.buy.key);

  const selectCurrency = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => {
    if (isFiat(currency)) {
      selectFiat(currency);
    }
    if (isCrypto(currency)) {
      selectCrypto(currency);
    }
  };

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
            minValue={minSellValue}
            value={sellValue}
            onInputBlur={checkMinSellValue}
            onChangeCurrency={selectCurrency}
          />
          <CryptoFormField
            action={CryptoFormFieldAction.BUY}
            currency={selectedCrypto}
            currencies={cryptoList}
            value={fiat2CryptoValue}
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
