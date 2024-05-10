import { create } from 'zustand';

type ClassType = {
  variables?: IVariable[];
  setVariables: (variables: IVariable[]) => void;
  classManagerLesson?: IClassManagerLesson;
  setClassManagerLesson: (classManagerLesson: IClassManagerLesson) => void;
};
const useVariable = create<ClassType>((set) => ({
  variables: undefined,
  setVariables: (variables: IVariable[]) => set(() => ({ variables })),
  classManagerLesson: undefined,
  setClassManagerLesson: (classManagerLesson: IClassManagerLesson) =>
    set(() => ({ classManagerLesson })),
}));

export default useVariable;
