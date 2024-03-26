import { Button, Card } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';
import { IconType } from 'react-icons';

import VerificationStatus from '../KYC/VerificationStatus';

import { DashboardTabs, KYCStatuses } from '@/constants';
import { separateNumbers } from '@/utils/converters';

type ButtonAction = {
  id: DashboardTabs | null;
  title: string;
  icon: IconType;
  onClick: () => void;
  disabled?: boolean;
};

type MainInformationProps = {
  className?: string;
  actionButtons: ButtonAction[];
  balance: number;
  activeTab: DashboardTabs | null;
  verificationStatus?: KYCStatuses;
  openKYC: () => void;
};

const MainInformation: FC<MainInformationProps> = (props) => {
  const { className, actionButtons, balance, activeTab, verificationStatus, openKYC } = props;
  return (
    <Card
      className={cn(
        'flex w-full flex-shrink-0 flex-col gap-4 bg-gray-100 p-4 xs:px-6 xs:py-6 sm:gap-0 sm:px-8',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-6">
          <div className="self-center lg:self-start">
            <p className="whitespace-nowrap text-sm sm:text-base">Total balance</p>
            <p className="whitespace-nowrap font-semibold sm:text-2xl lg:text-4xl">€ {separateNumbers(balance)}</p>
          </div>
        </div>
        {verificationStatus && <VerificationStatus openKYC={openKYC} verifyStatus={verificationStatus} />}
      </div>
      <div className="mt-2 grid  grid-cols-2 justify-between gap-x-2 gap-y-3 xs:gap-4 sm:mt-10 xl:grid-cols-4">
        {actionButtons.map((button, index) => (
          <Button
            key={index}
            className={cn(
              'bg-white',
              button.disabled ? '!cursor-not-allowed opacity-50 hover:!opacity-50' : ' hover:!bg-gray-200',
              activeTab === button.id && 'bg-tenant-main text-white hover:!bg-tenant-main hover:!text-white',
            )}
            onClick={button.onClick}
            disabled={button?.disabled}
          >
            <span className="capitalize">{button.title}</span> <button.icon className="ml-2 flex-shrink-0 " />
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default MainInformation;
