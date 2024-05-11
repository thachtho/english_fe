import { Input } from 'antd';
import { useRef } from 'react';
import { useFocusInput } from '../../../../hooks/useFocusInput';
import useExercise from '../state';

function InputFiledExercise() {
  const inputRef = useRef<any>(null);
  const { setInputName, validationMessages, setValidationErrors, inputName } =
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
    <div className="flex justify-center items-center mt-2 mb-4">
      <span>Nhập: </span>
      <div className="flex relative">
        <Input
          ref={inputRef}
          onChange={(e) => handleChange(e)}
          status={status}
          value={inputName}
        />

        {validationMessages?.name && (
          <i
            className="absolute text-danger text-xs"
            style={{ bottom: '-20px' }}
          >
            *{validationMessages?.name}
          </i>
        )}
      </div>
    </div>
  );
}

export default InputFiledExercise;
