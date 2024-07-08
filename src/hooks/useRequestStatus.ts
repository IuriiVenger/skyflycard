import { useState } from 'react';

import { RequestStatus } from '@/constants';

type RequestStatusesRecord = Record<keyof typeof RequestStatus, boolean>;

type UseRequestStatusReturnType = [RequestStatusesRecord, () => void, () => void, () => void];

type UseRequestsStatusRecord = Record<string, RequestStatusesRecord>;
type UseRequestsStatusReturnType = [
  UseRequestsStatusRecord,
  (key: string) => void,
  (key: string) => void,
  (key: string) => void,
];

export const useRequestStatus = (): UseRequestStatusReturnType => {
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

export const useRequestsStatus = (args: Array<string>): UseRequestsStatusReturnType => {
  const generateStatusesData = (status: RequestStatus) =>
    Object.entries(RequestStatus).reduce(
      (acc, [statusKey, statusValue]) => ({ ...acc, [statusKey]: statusValue === status }),
      {} as RequestStatusesRecord,
    );

  const initialState = args.reduce(
    (acc, key) => ({
      ...acc,
      [key]: generateStatusesData(RequestStatus.NONE),
    }),

    {} as UseRequestsStatusRecord,
  );

  const [statuses, setStatuses] = useState<UseRequestsStatusRecord>(initialState);

  const setStatusToKey = (targetKey: string, status: RequestStatus) => {
    setStatuses((prev) =>
      Object.entries(prev).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: key === targetKey ? generateStatusesData(status) : value,
        }),
        {} as UseRequestsStatusRecord,
      ),
    );
  };

  const setPending = (targetKey: string) => setStatusToKey(targetKey, RequestStatus.PENDING);

  const setFullfilled = (targetKey: string) => setStatusToKey(targetKey, RequestStatus.FULLFILLED);

  const setRejected = (targetKey: string) => setStatusToKey(targetKey, RequestStatus.REJECTED);

  return [statuses, setPending, setFullfilled, setRejected];
};
