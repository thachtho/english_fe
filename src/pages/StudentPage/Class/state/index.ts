import { create } from 'zustand';

type ClassType = {
  classList: IClassStudent[];
  setClassList: (classList: IClassStudent[]) => void;
};
const useClass = create<ClassType>((set) => ({
  classList: [],
  setClassList: (classList: IClassStudent[]) => set(() => ({ classList })),
}));

export default useClass;
