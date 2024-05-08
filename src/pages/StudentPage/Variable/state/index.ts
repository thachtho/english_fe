import { create } from 'zustand';

type ClassType = {
  variables: IVariable[];
  setVariables: (variables: IVariable[]) => void;
};
const useVariable = create<ClassType>((set) => ({
  variables: [],
  setVariables: (variables: IVariable[]) => set(() => ({ variables })),
}));

export default useVariable;
