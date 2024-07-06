import { useState } from 'react';

import { RequestStatus } from '@/constants';

type RequestStatusesRecord = Record<keyof typeof RequestStatus, boolean>;

type UseRequestStatusReturnType = [RequestStatusesRecord, () => void, () => void, () => void];

const useRequestStatus = (): UseRequestStatusReturnType => {
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.NONE);
  const setPending = () => setStatus(RequestStatus.PENDING);
  const setFullfilled = () => setStatus(RequestStatus.FULLFILLED);
  const setRejected = () => setStatus(RequestStatus.REJECTED);

  const requestStatuses = Object.entries(RequestStatus).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value === status }),
    {} as RequestStatusesRecord,
  );

  return [requestStatuses, setPending, setFullfilled, setRejected];
};

export default useRequestStatus;
