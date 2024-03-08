'use client';

import { Button, Card, Tab, Tabs } from '@nextui-org/react';

import cx from 'classnames';

import Link from 'next/link';
import { FC, useState } from 'react';

import CryptoFormField from './CryptoFormField';

import { API } from '@/api/types';
import { CryptoFormFieldAction, CryptoFormTabs } from '@/constants';
import { UseExchangeData } from '@/hooks/useExchange';
import { getActiveFiatAvailableCrypto, isCrypto, isFiat } from '@/utils/financial';

type CryptoFormTabsType = {
  [key in CryptoFormTabs]: {
    tabTitle: string;
    getButtonTitle: (currency: string) => string;
    key: CryptoFormTabs;
  };
};

type CryptoFormProps = {
  selectCrypto: (crypto: API.List.Crypto) => void;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectedCrypto: API.List.Crypto;
  selectedFiat: API.List.Fiat;
  chainList: API.List.Chains[];
  cryptoList: API.List.Crypto[];
  fiatList: API.List.Fiat[];
  className?: string;
  exchangeData: UseExchangeData;
};

const CryptoForm: FC<CryptoFormProps> = (props) => {
  const {
    selectedCrypto,
    selectedFiat,
    cryptoList,
    fiatList,
    chainList,
    selectCrypto,
    selectFiat,
    className,
    exchangeData,
  } = props;

  const { sellValue, setSellValue, fiat2CryptoValue, minSellValue, checkMinSellValue, exchangeRate } = exchangeData;

  const availableCrypto = getActiveFiatAvailableCrypto(exchangeRate, cryptoList);

  const cryptoFormTabs: CryptoFormTabsType = {
    [CryptoFormTabs.BUY]: {
      tabTitle: 'Buy',
      getButtonTitle: (currency: string) => `Buy ${currency} now`,
      key: CryptoFormTabs.BUY,
    },
    [CryptoFormTabs.EXCHANGE]: {
      tabTitle: 'Exchange',
      // eslint-disable-next-line no-console
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
    <Card className={cx('w-full max-w-xl p-4 py-6 xs:px-10 xs:py-8', className)}>
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
            currencies={availableCrypto}
            value={fiat2CryptoValue}
            onChangeCurrency={selectCurrency}
            chains={chainList}
          />
        </Tab>
        <Tab
          key={cryptoFormTabs.exchange.key}
          title={cryptoFormTabs.exchange.tabTitle}
          className="flex flex-col gap-3"
          isDisabled
        >
          <p>Exchange</p>
        </Tab>
      </Tabs>
      <Link href="/dashboard">
        <Button radius="sm" color="success" size="lg" className="mt-2 w-full font-medium text-white">
          {cryptoFormTabs[activeTabKey].getButtonTitle(selectedCrypto.name)}
        </Button>
      </Link>
    </Card>
  );
};

export default CryptoForm;
