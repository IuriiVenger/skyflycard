'use client';

import { Button, Card, Tab, Tabs } from '@nextui-org/react';
import { FC, useState } from 'react';

import CryptoFormField from './CryptoFormField';

import { API } from '@/api/types';
import { CryptoFormFieldAction } from '@/constants';
import { isCrypto } from '@/utils/currencies';

type CryptoFormTabs = {
  [key: string]: {
    tabTitle: string;
    clickButtonHandler: () => void;
    getButtonTitle: (currency: string) => string;
    key: string;
  };
};

type CryptoFormProps = {
  selectCrypto: (crypto: API.List.Crypto) => void;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectedCrypto: API.List.Crypto;
  selectedFiat: API.List.Fiat;
  cryptoList: API.List.Crypto[];
  fiatList: API.List.Fiat[];
  fiatExchangeRate: API.Exchange.Fiat2Crypto[];
};

const CryptoForm: FC<CryptoFormProps> = (props) => {
  const { selectedCrypto, selectedFiat, cryptoList, fiatList, fiatExchangeRate, selectCrypto, selectFiat } = props;

  const cryptoFormTabs: CryptoFormTabs = {
    buy: {
      tabTitle: 'Buy',
      clickButtonHandler: () => console.log('buy'),
      getButtonTitle: (currency: string) => `Buy ${currency} now`,
      key: 'buy',
    },
    exchange: {
      tabTitle: 'Exchange',
      clickButtonHandler: () => console.log('Exchange'),
      getButtonTitle: (currency: string) => `Exchange ${currency} now`,
      key: 'exchange',
    },
  };

  const [sellValue, setSellValue] = useState(0);
  const [buyValue, setBuyValue] = useState(0);
  const [activeTab, setActiveTab] = useState(cryptoFormTabs.buy);

  const activeFiatExchangeRate = fiatExchangeRate.find((rate) => rate.crypto_uuid === selectedCrypto.uuid)?.rate || 0;
  const buyingCryptoValue = sellValue * activeFiatExchangeRate;

  const selectCurrency = (currency: API.List.Crypto | API.List.Fiat) =>
    isCrypto(currency) ? selectCrypto(currency) : selectFiat(currency);

  return (
    <Card className="w-full max-w-xl px-10 py-8">
      <Tabs
        selectedKey={activeTab.key}
        onSelectionChange={(key) => {
          setActiveTab(cryptoFormTabs[key]);
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
            value={sellValue}
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
        <Tab key={cryptoFormTabs.exchange.key} title={cryptoFormTabs.exchange.tabTitle} className="flex flex-col gap-3">
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
        onClick={activeTab.clickButtonHandler}
      >
        {activeTab.getButtonTitle(selectedCrypto.name)}
      </Button>
    </Card>
  );
};

export default CryptoForm;
