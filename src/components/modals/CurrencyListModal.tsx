import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

import cn from 'classnames';
import { FC } from 'react';

import { FaCheckCircle } from 'react-icons/fa';

import { API } from '@/api/types';
import CurrencyInfo from '@/components/Currency/CurrencyInfo';
import { framerMotionAnimations } from '@/config/animations';
import { isChain } from '@/utils/financial';

type CurrencyListModalProps = {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  chains?: API.List.Chains[];
  onSelect: (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => void;
  currencies: API.List.Crypto[] | API.List.Fiat[] | API.List.Chains[];
  activeCurrency: API.List.Crypto | API.List.Fiat | API.List.Chains;
};

const CurrencyListModal: FC<CurrencyListModalProps> = (props) => {
  const { isOpen, setIsModalOpen, onSelect, currencies, activeCurrency, chains } = props;

  const handleCurrencyClick = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => {
    onSelect(currency);
    setIsModalOpen(false);
  };

  const getCurrencyId = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) =>
    isChain(currency) ? currency.id : currency.uuid;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsModalOpen}
      motionProps={{
        variants: framerMotionAnimations.downEnterExit,
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Select a currency</ModalHeader>
            <ModalBody className="gap-0 px-0">
              {currencies.map((currency, index) => (
                <div
                  className={cn(
                    'flex cursor-pointer items-center justify-between border-b  px-4 py-2 transition-background ',
                    getCurrencyId(currency) === getCurrencyId(activeCurrency)
                      ? 'bg-gray-100'
                      : 'hover:bg-light-lavander-gradient',
                  )}
                  key={index}
                  onClick={() => handleCurrencyClick(currency)}
                >
                  <CurrencyInfo
                    className=""
                    currencyTitleClassname="font-medium text-lg"
                    currency={currency}
                    chains={chains}
                    hideShevron
                  />
                  {getCurrencyId(currency) === getCurrencyId(activeCurrency) && (
                    <FaCheckCircle className="text-tenant-main" />
                  )}
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
