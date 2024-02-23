import { Card } from '@nextui-org/react';

import { FC, useState } from 'react';

import CurrencyInfo from './CurrencyInfo';

import CurrencyListModal from './CurrencyListModal';

import { API } from '@/api/types';
import { CryptoFormFieldAction } from '@/constants';
import { roundToDecimals } from '@/utils/converters';

type CryptoFormFieldProps = {
  action: CryptoFormFieldAction;
  currency: API.List.Crypto | API.List.Fiat;
  currencies: API.List.Crypto[] | API.List.Fiat[];
  onChangeCurrency: (currency: API.List.Crypto | API.List.Fiat) => void;
  value: number;
  setValue?: (value: number) => void;
  onInputBlur?: () => void;
  minValue?: number;
};

const CryptoFormField: FC<CryptoFormFieldProps> = (props) => {
  const { action, currencies, value, currency, onChangeCurrency, setValue, onInputBlur, minValue } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toogleIsModalOpen = () => setIsModalOpen((prev) => !prev);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setValue && setValue(Number(e.target.value));
  const inputValue = roundToDecimals(value, 4);

  const title = {
    [CryptoFormFieldAction.BUY]: 'You are buying',
    [CryptoFormFieldAction.SELL]: 'You are selling',
  };

  return (
    <Card className="flex w-full p-4" radius="sm">
      <p className="mb-2 text-xs">{title[action]}</p>

      <div className="flex items-start justify-between">
        <CurrencyInfo currency={currency} onCurrencyClick={toogleIsModalOpen} minValue={minValue} />
        <input
          className="w-full text-end text-xl font-semibold  tracking-wide focus-visible:outline-none disabled:bg-inherit"
          onBlur={onInputBlur}
          value={inputValue}
          disabled={!setValue}
          onChange={handleInput}
        />
      </div>
      <CurrencyListModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        activeCurrency={currency}
        currencies={currencies}
        onSelect={onChangeCurrency}
      />
    </Card>
  );
};

export default CryptoFormField;
