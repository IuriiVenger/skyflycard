import { Input, InputProps } from '@nextui-org/react';
import { FC, useState } from 'react';

const CustomInput: FC<InputProps> = (props) => {
  const [initialWindowScroll, setInitialWindowScroll] = useState(0);

  const handleFocus = () => {
    setInitialWindowScroll(window.scrollY);
  };

  const handleBlur = () => {
    if (initialWindowScroll !== window.scrollY) {
      console.log('scrolling back');
      window.scrollTo({ top: initialWindowScroll, behavior: 'instant' });
    }
  };

  return <Input onBlur={handleBlur} onFocus={handleFocus} onBl {...props} />;
};

export default CustomInput;
