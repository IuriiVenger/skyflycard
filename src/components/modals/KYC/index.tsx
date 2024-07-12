/* eslint-disable jsx-a11y/control-has-associated-label */
import { Modal, ModalBody, ModalContent } from '@nextui-org/react';

import { AxiosResponse } from 'axios';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Kyc from './steps/Kyc';
import Start from './steps/Start';

import { API } from '@/api/types';
import { framerMotionAnimations } from '@/config/animations';

type KYCModalProps = {
  onClose: Function;
  isOpen: boolean;
  user_id: string | undefined;
  setIsModalOpen: (isOpen: boolean) => void;
  getSumsubToken: (userId: string) => Promise<AxiosResponse<API.KYC.Sumsub.GenerateToken.Response>>;
};

enum KYCSteps {
  START,
  KYC,
}

const KYCModal: FC<KYCModalProps> = ({ onClose, isOpen, setIsModalOpen, user_id, getSumsubToken }) => {
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

  if (!user_id) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsModalOpen}
      onClose={closeHandler}
      motionProps={{
        variants: framerMotionAnimations.downEnterExit,
      }}
      shouldBlockScroll
    >
      <ModalContent>
        <ModalBody className="p-5">
          {step === KYCSteps.START && (
            <Start nextStep={() => setStep(KYCSteps.KYC)} isPending={isPending} isError={isError} />
          )}
          {step === KYCSteps.KYC && <Kyc accessToken={accessToken} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default KYCModal;
