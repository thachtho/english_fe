import useExercise from '../state';
import { validateBeforeSumitExercise } from '../utils';

const useHandleExcercise = () => {
  const { inputName, setValidationErrors, variable } = useExercise();

  const handleSubmit = () => {
    const newValidationErrors = validateBeforeSumitExercise({
      name: inputName,
    });

    console.log(11111, inputName);
    console.log(2222, variable?.name);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
  };

  return {
    handleSubmit,
  };
};

export { useHandleExcercise };
