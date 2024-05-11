import { useEffect } from 'react';

const useFocusInput = (
  inputRef: React.MutableRefObject<any>,
  depedency?: any,
) => {
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [depedency]);
};

export { useFocusInput };
