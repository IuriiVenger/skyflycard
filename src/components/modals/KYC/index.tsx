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
  onOpenChange: (isOpen: boolean) => void;
  getSumsubToken: (userId: string) => Promise<AxiosResponse<API.KYC.Sumsub.GenerateToken.Response>>;
};

const KYCModal: FC<KYCModalProps> = ({ onClose, isOpen, onOpenChange, user_id, getSumsubToken }) => {
  const [step, setStep] = useState<Number>(1);
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
    onClose();
  };

  if (!user_id) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={closeHandler}
      motionProps={{
        variants: framerMotionAnimations.downEnterExit,
      }}
    >
      <ModalContent>
        <ModalBody className="p-5">
          {step === 1 && <Start nextStep={() => setStep(2)} isPending={isPending} isError={isError} />}
          {step === 2 && <Kyc accessToken={accessToken} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default KYCModal;
