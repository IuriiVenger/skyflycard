import cn from 'classnames';
import { FC } from 'react';
import { GoHistory, GoIssueDraft, GoNoEntry, GoUnverified, GoVerified } from 'react-icons/go';
import { MdMoreTime } from 'react-icons/md';

import { KYCStatuses, requestKYCStatuses } from '@/constants';

type VerificationStatusProps = {
  verifyStatus: KYCStatuses;
  openKYC: () => void;
};

const verificationStatusInfo = {
  [KYCStatuses.PENDING]: {
    title: 'Verification in progress',
    subtitle: 'Verification is pending approval.',
    icon: GoHistory,
  },
  [KYCStatuses.APPROVED]: {
    title: 'Verified',
    subtitle: 'You have full access to the platform.',
    icon: GoVerified,
  },
  [KYCStatuses.DECLINED]: {
    title: 'Verification failed',
    subtitle: 'Verification has been declined.',
    icon: GoNoEntry,
  },
  [KYCStatuses.REJECT]: {
    title: 'Verification Rejected',
    subtitle: 'Verification has been rejected.',
    icon: GoNoEntry,
  },
  [KYCStatuses.DOUBLE]: {
    title: 'Verification issue',
    subtitle: 'A user with these documents has already been verified in another account.',
    icon: GoIssueDraft,
  },
  [KYCStatuses.HOLD]: {
    title: 'Verification On Hold',
    subtitle: 'Verification is currently on hold. Further action may be required.',
    icon: MdMoreTime,
  },
  [KYCStatuses.SOFT_REJECT]: {
    title: 'Verification failed',
    subtitle: 'Please fill out the KYC form again.',
    icon: GoUnverified,
  },
  [KYCStatuses.UNVERIFIED]: {
    title: 'Please verify your identity',
    subtitle: 'After verification you will have full access to the platform',
    icon: GoUnverified,
  },
};

const VerificationStatus: FC<VerificationStatusProps> = ({ verifyStatus, openKYC }) => {
  const Icon = verificationStatusInfo[verifyStatus]?.icon;
  const isKYCRequired = requestKYCStatuses.includes(verifyStatus);

  const clickHandler = () => {
    if (isKYCRequired) {
      openKYC();
    }
  };

  const CustomTag = isKYCRequired ? 'button' : 'div';

  return (
    <CustomTag
      className={cn('flex w-fit items-center justify-between gap-4', isKYCRequired && 'hover:opacity-70')}
      onClick={clickHandler}
    >
      <div>
        <p className="flex text-sm font-bold sm:text-xl">{verificationStatusInfo[verifyStatus]?.title}</p>
        <p className="mt-1 max-w-40 text-left text-[8px] ">{verificationStatusInfo[verifyStatus]?.subtitle}</p>
      </div>
      {Icon && <Icon className="h-6 w-6 xs:h-8 xs:w-8" />}
    </CustomTag>
  );
};

export default VerificationStatus;
