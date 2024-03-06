import { Card, CardBody, CardFooter, Input } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';

import { API } from '@/api/types';
import { UseExchangeData } from '@/hooks/useExchange';
import { roundToDecimals } from '@/utils/converters';
import { isCrypto } from '@/utils/financial';

type ExchangeFormProps = {
  className?: string;
  sellingCurrency: API.List.Fiat | API.List.Crypto;
  buyingCurrency: API.List.Fiat | API.List.Crypto;
  exchangeData: UseExchangeData;
  isWithdraw?: boolean;
};

const ExchangeInput: FC<ExchangeFormProps> = (props) => {
  const { className, sellingCurrency, buyingCurrency, exchangeData, isWithdraw } = props;

  const { sellValue, setSellValue, fiat2CryptoValue, crypto2FiatValue, minSellValue, activeExchangeFee } = exchangeData;

  const isByingCrypto = isCrypto(buyingCurrency);

  const buyingValue = isByingCrypto ? fiat2CryptoValue : crypto2FiatValue;
  const feeSymbol = isByingCrypto ? sellingCurrency.symbol : buyingCurrency.symbol;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setSellValue && setSellValue(Number(e.target.value));
  const prettyBuyingValue = roundToDecimals(buyingValue, 2);
  const minSellTip = minSellValue ? `min: ${minSellValue}${feeSymbol}` : '';

  return (
    <section>
      <Card className={cn(className, 'p-3')}>
        <CardBody className="flex flex-col gap-2">
          <Input
            type="number"
            label={`Amount to ${isWithdraw ? 'Withdraw' : 'deposit'} `}
            labelPlacement="outside"
            placeholder="0.00"
            onChange={handleInput}
            value={String(sellValue)}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">{sellingCurrency.symbol}</span>
              </div>
            }
            endContent={isByingCrypto && <small className="flex-shrink-0 text-xs text-gray-400">{minSellTip}</small>}
          />
        </CardBody>
        <CardFooter>
          <div className="flex w-full items-center justify-between px-1">
            <span className="text-xs md:text-base">
              You will receive <strong>{prettyBuyingValue}</strong> {buyingCurrency.symbol}{' '}
              {isByingCrypto ? '' : `(${minSellTip})`}
            </span>
            <span className="text-xs text-gray-400">
              Fee: {activeExchangeFee}
              {feeSymbol}
            </span>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default ExchangeInput;
