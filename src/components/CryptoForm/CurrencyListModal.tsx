import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

import cx from 'classnames';
import { FC } from 'react';

import { FaCheckCircle } from 'react-icons/fa';

import CurrencyInfo from './CurrencyInfo';

import { API } from '@/api/types';

type CurrencyListModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelect: (currency: API.List.Crypto | API.List.Fiat) => void;
  currencies: API.List.Crypto[] | API.List.Fiat[];
  activeCurrency: API.List.Crypto | API.List.Fiat;
};

const CurrencyListModal: FC<CurrencyListModalProps> = (props) => {
  const { isOpen, onOpenChange, onSelect, currencies, activeCurrency } = props;

  const handleCurrencyClick = (currency: API.List.Crypto | API.List.Fiat) => {
    onSelect(currency);
    onOpenChange(false);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Select a currency</ModalHeader>
            <ModalBody className="gap-0 px-0">
              {currencies.map((currency, index) => (
                <div
                  className={cx(
                    'flex cursor-pointer items-center justify-between border-b  px-4 py-2 transition-background ',
                    currency.uuid === activeCurrency.uuid ? 'bg-gray-100' : 'hover:bg-emerald-50',
                  )}
                  key={index}
                  onClick={() => handleCurrencyClick(currency)}
                >
                  <CurrencyInfo
                    className=""
                    currencyTitleClassname="font-medium text-lg"
                    currency={currency}
                    hideShevron
                  />
                  {currency.uuid === activeCurrency.uuid && <FaCheckCircle className="text-green-500" />}
                </div>
              ))}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CurrencyListModal;
