/* eslint-disable jsx-a11y/control-has-associated-label */
import { Modal, ModalBody, ModalContent } from '@nextui-org/react';

import { AxiosResponse } from 'axios';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Kyc from './steps/Kyc';
import Start from './steps/Start';

import { API } from '@/api/types';
import { framerMotionAnimations } from '@/config/animations';
import { KYCStatuses } from '@/constants';

type KYCModalProps = {
  onClose: Function;
  isOpen: boolean;
  user_id: string;
  setIsModalOpen: (isOpen: boolean) => void;
  getSumsubToken: (userId: string) => Promise<AxiosResponse<API.KYC.Sumsub.GenerateToken.Response>>;
  verificationStatus: KYCStatuses;
};

enum KYCSteps {
  START,
  KYC,
}

const KYCModal: FC<KYCModalProps> = (props) => {
  const { onClose, isOpen, user_id, setIsModalOpen, getSumsubToken } = props;
  const [step, setStep] = useState(KYCSteps.START);
  const [accessToken, setAccessToken] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const getToken = async (userId: string) => {
      try {
        setIsError(false);
        setIsPending(true);
        const { status, data } = await getSumsubToken(userId);

        if (status === 200 && data.token) {
          setAccessToken(data.token);
        } else {
          setIsError(true);
          toast.error(data.userId);
        }
        setIsPending(false);
      } catch (e) {
        setIsError(true);
        setIsPending(false);
      }
    };
    isOpen && user_id && getToken(user_id);
  }, [isOpen, user_id]);

  const closeHandler = () => {
    step === KYCSteps.KYC && onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsModalOpen}
      onClose={closeHandler}
      motionProps={{
        variants: framerMotionAnimations.downEnterExit,
      }}
    >
      <ModalContent>
        <ModalBody className="p-5">
          {step === KYCSteps.START && (
            <Start nextStep={() => setStep(KYCSteps.KYC)} isPending={isPending} isError={isError} {...props} />
          )}
          {step === KYCSteps.KYC && <Kyc accessToken={accessToken} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default KYCModal;
