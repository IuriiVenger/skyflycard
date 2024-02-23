import cx from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import { FaChevronDown } from 'react-icons/fa6';

import { API } from '@/api/types';

import { getCurrencyIconSrc, isCrypto } from '@/utils/currencies';

type CurrencyInfoProps = {
  currency: API.List.Crypto | API.List.Fiat;
  hideShevron?: boolean;
  onCurrencyClick?: () => void;
  className?: string;
  currencyTitleClassname?: string;
  minValue?: number;
};

const CurrencyInfo: FC<CurrencyInfoProps> = (props) => {
  const { currency, onCurrencyClick, hideShevron, className, currencyTitleClassname, minValue } = props;
  const currencyName = isCrypto(currency) ? currency.name : currency.code;

  return (
    <div className={cx(className, 'flex shrink-0 items-center gap-2')}>
      <Image
        className="h-9 w-9 rounded-full object-cover"
        src={getCurrencyIconSrc(currency)}
        alt="currency label"
        height={36}
        width={36}
      />
      <div className="text-left">
        <button
          className={cx(currencyTitleClassname, 'flex items-center gap-1 text-xl font-bold')}
          type="button"
          onClick={onCurrencyClick}
        >
          <span>{currencyName}</span> {!hideShevron && <FaChevronDown className="text-sm text-gray-500" />}
        </button>
        <p className="text-xs">
          {currency.symbol} {!!minValue && `(min ${minValue})`}
        </p>
      </div>
    </div>
  );
};

export default CurrencyInfo;
