import toast from 'react-hot-toast';
import useExercise from '../state';
import { validateBeforeSumitExercise } from '../utils';
import { updateExerciseVariable } from '../../../../api/exercise-variable.api';

const useHandleExcercise = () => {
  const {
    inputName,
    setValidationErrors,
    variable,
    exerciseVariable,
    isReload,
    setIsReload,
    setInputName,
  } = useExercise();

  const handleSubmit = async () => {
    const newValidationErrors = validateBeforeSumitExercise({
      name: inputName,
      currentName: String(variable?.name),
    });

    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    try {
      const id = Number(exerciseVariable?.id);
      const count = Number(exerciseVariable?.count) + 1;
      const input = {
        id,
        count,
      };

      await updateExerciseVariable(id, input);
      setIsReload(!isReload);
      setInputName('');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return {
    handleSubmit,
  };
};

export { useHandleExcercise };
