import { Modal, ModalProps } from '@nextui-org/react';
import { FC } from 'react';

import useBreakpoints from '@/hooks/useBreakpoints';

const CustomModal: FC<ModalProps> = (props) => {
  const { mdBreakpoint } = useBreakpoints();
  const { size } = props;

  const responsiveSize = mdBreakpoint ? 'md' : 'full';

  return <Modal size={size || responsiveSize} {...props} />;
};

export default CustomModal;
