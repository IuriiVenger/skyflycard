import cn from 'classnames';
import { FC } from 'react';

import { HiOutlineSelector } from 'react-icons/hi';

import { API } from '@/api/types';
import CurrencyInfo from '@/components/Currency/CurrencyInfo';

type SelectCurrencyProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  currency: API.List.Fiat | API.List.Crypto | API.List.Chains;
  balance?: number;
  chains?: API.List.Chains[];
};

const SelectCurrency: FC<SelectCurrencyProps> = (props) => {
  const { label, className, onClick, currency, balance, chains } = props;
  return (
    <div className={className}>
      <h3 className="mb-4 text-xl font-bold">{label}</h3>
      <div
        onClick={onClick}
        className={cn('flex w-full items-center justify-between rounded border px-4 py-3', onClick && 'cursor-pointer')}
      >
        <CurrencyInfo hideShevron currency={currency} chains={chains} />
        <div className="flex items-center gap-2">
          <HiOutlineSelector className="text-xl" />
        </div>
      </div>
      {balance !== undefined && (
        <div className="w-full pr-1 text-end">
          <small>
            available {balance} {currency.symbol}
          </small>
        </div>
      )}
    </div>
  );
};

export default SelectCurrency;
