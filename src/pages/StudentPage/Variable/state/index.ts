import { create } from 'zustand';
const initialState = {
  variables: null,
  classManagerLesson: null,
};

type ClassType = {
  variables: IVariable[] | null;
  setVariables: (variables: IVariable[] | null) => void;
  classManagerLesson: IClassManagerLesson | null;
  setClassManagerLesson: (classManagerLesson: IClassManagerLesson) => void;
  restore: () => void;
};
const useVariable = create<ClassType>((set) => ({
  variables: null,
  setVariables: (variables: IVariable[] | null) => set(() => ({ variables })),
  classManagerLesson: null,
  setClassManagerLesson: (classManagerLesson: IClassManagerLesson) =>
    set(() => ({ classManagerLesson })),
  restore: () => set({ ...initialState }),
}));

export default useVariable;
