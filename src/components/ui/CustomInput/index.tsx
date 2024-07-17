import { Input, InputProps } from '@nextui-org/react';
import { FC, FocusEvent, useState } from 'react';

const CustomInput: FC<InputProps> = (props) => {
  const [initialWindowScroll, setInitialWindowScroll] = useState(0);
  const { onBlur, onFocus } = props;

  const handleFocus = (e: FocusEvent<Element, Element>) => {
    setInitialWindowScroll(window.scrollY);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: FocusEvent<Element, Element>) => {
    if (initialWindowScroll !== window.scrollY) {
      window.scrollTo({ top: initialWindowScroll, behavior: 'instant' });
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  return <Input onBlur={handleBlur} onFocus={handleFocus} onBl {...props} />;
};

export default CustomInput;
