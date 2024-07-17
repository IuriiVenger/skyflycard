import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps } from '@nextui-org/react';
import { FC, ReactNode } from 'react';

import { framerMotionAnimations } from '@/config/animations';
import useBreakpoints from '@/hooks/useBreakpoints';

type CustomModalProps = ModalProps & {
  header?: ReactNode | string;
  footer?: ReactNode | string;
};

const CustomModal: FC<CustomModalProps> = (props) => {
  const { mdBreakpoint } = useBreakpoints();
  const { size, scrollBehavior, motionProps, children, header, footer } = props;

  const responsiveSize = mdBreakpoint ? 'md' : 'full';
  const responsiveMotionProps = mdBreakpoint ? { variants: framerMotionAnimations.downEnterExit } : undefined;

  return (
    <Modal
      motionProps={motionProps || responsiveMotionProps}
      scrollBehavior={scrollBehavior}
      size={size || responsiveSize}
      {...props}
      className="overflow-y-auto"
    >
      <ModalContent className=" max-h-svh md:max-h-[90vh]">
        {!!header && <ModalHeader>{header}</ModalHeader>}
        <ModalBody className="pb-10 shadow-inner sm:max-h-[90vh]">{children}</ModalBody>
        {!!footer && (
          <ModalFooter
            className="relative z-10 flex flex-col "
            style={{
              boxShadow:
                '0px -10px 6px -3px rgba(255,255,255,0.95), 0px -20px 6px -3px rgba(255,255,255,0.85), 0px -31px 6px -3px rgba(255,255,255,0.8)',
            }}
          >
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
