import { useMediaQuery } from 'react-responsive';

const useBreakpoints = () => {
  const xsBreakpoint = useMediaQuery({ minWidth: 480 });
  const smBreakpoint = useMediaQuery({ minWidth: 640 });
  const mdBreakpoint = useMediaQuery({ minWidth: 768 });
  const lgBreakpoint = useMediaQuery({ minWidth: 1024 });
  const xlBreakpoint = useMediaQuery({ minWidth: 1280 });
  const xxlBreakpoint = useMediaQuery({ minWidth: 1440 });
  const xxxlBreakpoint = useMediaQuery({ minWidth: 1680 });
  const xxxxlBreakpoint = useMediaQuery({ minWidth: 1800 });

  return {
    xsBreakpoint,
    smBreakpoint,
    mdBreakpoint,
    lgBreakpoint,
    xlBreakpoint,
    xxlBreakpoint,
    xxxlBreakpoint,
    xxxxlBreakpoint,
  };
};

export default useBreakpoints;
