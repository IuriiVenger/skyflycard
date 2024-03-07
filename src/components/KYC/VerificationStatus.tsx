import { FC } from 'react';
import { BsClock } from 'react-icons/bs';
import { FaClock } from 'react-icons/fa6';
import { MdDone, MdMoreTime } from 'react-icons/md';
import { PiProhibitBold } from 'react-icons/pi';
import { TbCopyOff } from 'react-icons/tb';

import { KYCStatuses } from '@/constants';

type VerificationStatusProps = {
  verifyStatus: KYCStatuses;
};

const VerificationStatus: FC<VerificationStatusProps> = ({ verifyStatus }) => {
  const verificationStatusInfo = {
    [KYCStatuses.PENDING]: {
      title: 'Verification Pending',
      subtitle: 'Verification is pending approval.',
      icon: BsClock,
    },
    [KYCStatuses.APPROVED]: {
      title: 'Verification Approved',
      subtitle: 'Verification has been successfully approved.',
      icon: MdDone,
    },
    [KYCStatuses.DECLINED]: {
      title: 'Verification Declined',
      subtitle: 'Verification has been declined. Please review and resubmit if necessary.',
      icon: PiProhibitBold,
    },
    [KYCStatuses.REJECT]: {
      title: 'Verification Rejected',
      subtitle: 'Verification has been rejected. Please review and resubmit if necessary.',
      icon: PiProhibitBold,
    },
    [KYCStatuses.DOUBLE]: {
      title: 'Duplicate Verification',
      subtitle: 'A duplicate verification request has been detected.',
      icon: TbCopyOff,
    },
    [KYCStatuses.HOLD]: {
      title: 'Verification On Hold',
      subtitle: 'Verification is currently on hold. Further action may be required.',
      icon: MdMoreTime,
    },
    [KYCStatuses.SOFT_REJECT]: {
      title: 'Soft Rejection',
      subtitle: 'Verification has been soft rejected. Please review and resubmit if necessary.',
      icon: MdMoreTime,
    },
    [KYCStatuses.UNVERIFIED]: {
      title: 'Unverified',
      subtitle: 'Verification is unverified. Please review and resubmit if necessary.',
      icon: MdMoreTime,
    },
  };

  return (
    <div className="custom_verification-status flex w-full items-center justify-between">
      <div>
        <div className="flex h-5 items-center justify-between">{verificationStatusInfo[verifyStatus]?.title}</div>
        <div className="custom_verification-status_subtitle w-40 text-left">
          {verificationStatusInfo[verifyStatus]?.subtitle}
        </div>
      </div>
      <FaClock className="h-6 w-6" />
    </div>
  );
};

export default VerificationStatus;
