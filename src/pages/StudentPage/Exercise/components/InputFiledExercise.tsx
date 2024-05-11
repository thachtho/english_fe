import { Input } from 'antd';
import { useRef } from 'react';
import { useFocusInput } from '../../../../hooks/useFocusInput';
import useExercise from '../state';

function InputFiledExercise() {
  const inputRef = useRef<any>(null);
  const { setInputName, validationMessages, setValidationErrors } =
    useExercise();
  useFocusInput(inputRef);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValidationErrors(null);
    setInputName(e.target.value);
  };
  const status = !!validationMessages?.name ? 'error' : '';

  return (
    <Input ref={inputRef} onChange={(e) => handleChange(e)} status={status} />
  );
}

export default InputFiledExercise;
