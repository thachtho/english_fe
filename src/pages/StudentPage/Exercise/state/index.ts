import { create } from 'zustand';
const initialState = {
  classManagerLesson: null,
  validationMessages: null,
  inputName: '',
  variable: null,
};

type ErrorMessageType = {
  name: string;
};

type ExerciseType = {
  classManagerLesson: IClassManagerLesson | null;
  setClassManagerLesson: (classManagerLesson: IClassManagerLesson) => void;

  validationMessages: ErrorMessageType | null;
  setValidationErrors: (errorMessage: ErrorMessageType | null) => void;

  inputName: string;
  setInputName: (inputName: string) => void;

  variable: IVariable | null;
  setVariable: (variable: IVariable) => void;

  restore: () => void;
};
const useExercise = create<ExerciseType>((set) => ({
  classManagerLesson: null,
  setClassManagerLesson: (classManagerLesson: IClassManagerLesson) =>
    set(() => ({ classManagerLesson })),
  validationMessages: null,
  setValidationErrors: (validationMessages: ErrorMessageType | null) =>
    set(() => ({ validationMessages })),

  inputName: '',
  setInputName: (inputName: string) => set(() => ({ inputName })),

  variable: null,
  setVariable: (variable: IVariable) => set(() => ({ variable })),

  restore: () => set({ ...initialState }),
}));

export default useExercise;
