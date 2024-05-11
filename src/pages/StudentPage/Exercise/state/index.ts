import { create } from 'zustand';
const initialState = {
  classManagerLesson: null,
  validationMessages: null,
  inputName: '',
  variable: null,
  exerciseVariables: null,
  numberRepeat: '',
};

type ErrorMessageType = {
  name: string;
};

type ExerciseType = {
  isReload: Boolean;
  setIsReload: (isReload: Boolean) => void;

  classManagerLesson: IClassManagerLesson | null;
  setClassManagerLesson: (classManagerLesson: IClassManagerLesson) => void;

  validationMessages: ErrorMessageType | null;
  setValidationErrors: (errorMessage: ErrorMessageType | null) => void;

  inputName: string;
  setInputName: (inputName: string) => void;

  variable: IVariable | null;
  setVariable: (variable: IVariable) => void;

  exerciseVariable: IExerciseVariable | null;
  setExerciseVariable: (exerciseVariables: IExerciseVariable) => void;

  numberRepeat: string;
  setNumberRepeat: (numberRepeat: string) => void;

  restore: () => void;
};
const useExercise = create<ExerciseType>((set) => ({
  isReload: false,
  setIsReload: (isReload: Boolean) => set(() => ({ isReload })),

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

  exerciseVariable: null,
  setExerciseVariable: (exerciseVariable: IExerciseVariable) =>
    set(() => ({ exerciseVariable })),

  numberRepeat: '',
  setNumberRepeat: (numberRepeat: string) => set(() => ({ numberRepeat })),

  restore: () => set({ ...initialState }),
}));

export default useExercise;
