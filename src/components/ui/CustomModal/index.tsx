import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps } from '@nextui-org/react';
import cn from 'classnames';
import { FC, ReactNode, useEffect } from 'react';

import { framerMotionAnimations } from '@/config/animations';
import useBreakpoints from '@/hooks/useBreakpoints';

type CustomModalProps = ModalProps & {
  header?: ReactNode | string;
  footer?: ReactNode | string;
  contentClassName?: string;
  bodyClassname?: string;
};

const CustomModal: FC<CustomModalProps> = (props) => {
  const { mdBreakpoint } = useBreakpoints();
  const {
    size,
    scrollBehavior,
    motionProps,
    children,
    header,
    footer,
    isOpen,
    className,
    contentClassName,
    bodyClassname,
    ...otherProps
  } = props;

  const responsiveSize = mdBreakpoint ? 'md' : 'full';
  const responsiveMotionProps = mdBreakpoint ? { variants: framerMotionAnimations.downEnterExit } : undefined;

  useEffect(() => {
    if (isOpen && !mdBreakpoint && window) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isOpen]);

  return (
    <Modal
      motionProps={motionProps || responsiveMotionProps}
      scrollBehavior={scrollBehavior}
      size={size || responsiveSize}
      isOpen={isOpen}
      {...otherProps}
      disableAnimation={!mdBreakpoint}
      className={cn('overflow-y-auto', className)}
    >
      <ModalContent className={cn('fixed left-0 top-0 max-h-svh md:static md:max-h-[90vh]', contentClassName)}>
        {!!header && <ModalHeader>{header}</ModalHeader>}
        <ModalBody className={cn('pb-10 shadow-inner sm:max-h-[90vh]', bodyClassname)}>{children}</ModalBody>

        <ModalFooter
          className="relative z-10 flex min-h-1 w-full flex-col pb-6 md:pb-4"
          style={{
            boxShadow:
              '0px -10px 6px -3px rgba(255,255,255,0.95), 0px -20px 6px -3px rgba(255,255,255,0.85), 0px -31px 6px -3px rgba(255,255,255,0.8)',
          }}
        >
          {footer}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
