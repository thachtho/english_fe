import { create } from 'zustand';

type ClassType = {
  variables: IVariable[] | null;
  setVariables: (variables: IVariable[] | null) => void;
  classManagerLesson?: IClassManagerLesson;
  setClassManagerLesson: (classManagerLesson: IClassManagerLesson) => void;
};
const useVariable = create<ClassType>((set) => ({
  variables: null,
  setVariables: (variables: IVariable[] | null) => set(() => ({ variables })),
  classManagerLesson: undefined,
  setClassManagerLesson: (classManagerLesson: IClassManagerLesson) =>
    set(() => ({ classManagerLesson })),
}));

export default useVariable;
