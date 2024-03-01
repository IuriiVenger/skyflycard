import { Button, Card } from '@nextui-org/react';
import cx from 'classnames';
import { FC } from 'react';
import { IconType } from 'react-icons';

import { DashboardTabs } from '@/constants';
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
};

const MainInformation: FC<MainInformationProps> = (props) => {
  const { className, actionButtons, balance, activeTab } = props;
  return (
    <Card className={cx('flex w-full flex-shrink-0 flex-col gap-4 bg-gray-100 px-8 py-6', className)}>
      <h1 className="self-center text-3xl font-bold lg:self-start">Dashboard</h1>
      <div className="self-center sm:mt-6 lg:self-start">
        <p>Available balance</p>
        <p className="text-4xl font-semibold">€ {separateNumbers(balance)}</p>
      </div>
      <div className="mt-4 grid grid-cols-1 justify-between gap-4 sm:mt-10 lg:grid-cols-2 xl:grid-cols-4">
        {actionButtons.map((button, index) => (
          <Button
            key={index}
            className={cx(
              'bg-white',
              button.disabled ? '!cursor-not-allowed opacity-50 hover:!opacity-50' : ' hover:!bg-gray-200',
              activeTab === button.id && 'bg-gray-200',
            )}
            size="lg"
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
