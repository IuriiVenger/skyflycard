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
  icon: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
};

type MainInformationProps = {
  className?: string;
  actionButtons: ButtonAction[];
  balance: number;
  activeDashboardTab: DashboardTabs | null;
  verificationStatus?: KYCStatuses;
  openKYC: () => void;
};

const MainInformation: FC<MainInformationProps> = (props) => {
  const { className, actionButtons, balance, activeDashboardTab, verificationStatus, openKYC } = props;
  return (
    <Card className={cn('flex h-fit w-full flex-shrink-0 flex-col gap-10  p-4 xs:px-6 xs:py-6 sm:px-8', className)}>
      <div className="flex flex-col flex-wrap items-center justify-around gap-4 xs:flex-row md:items-start lg:flex-nowrap lg:items-center lg:justify-between">
        <div className="flex flex-col gap-6">
          <div className="self-center text-center xs:text-start lg:self-start">
            <p className="whitespace-nowrap text-xl">Total balance</p>
            <p className="whitespace-nowrap  text-4xl font-medium">€ {separateNumbers(balance)}</p>
          </div>
        </div>
        {verificationStatus && <VerificationStatus openKYC={openKYC} verifyStatus={verificationStatus} />}
      </div>
      <div className="grid grid-cols-[repeat(2,min-content)] justify-center gap-1 xs:grid-cols-2  lg:grid-cols-[repeat(4,min-content)] lg:justify-start">
        {actionButtons.map((button, index) => (
          <Button
            key={index}
            className={cn(
              'bg-inherit lg:w-fit',
              button.disabled ? '!cursor-not-allowed opacity-50 hover:!opacity-50' : ' hover:!bg-gray-200',
              activeDashboardTab === button.id && 'bg-tenant-main text-white hover:!bg-tenant-main hover:!text-white',
            )}
            radius="sm"
            onClick={button.onClick}
            disabled={button?.disabled}
          >
            <div className="ml-2 flex-shrink-0 ">{button.icon}</div>
            <span className="capitalize">{button.title}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default MainInformation;
