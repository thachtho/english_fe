import { create } from 'zustand';

type UnitType = {
  classOption?: IClass;
  setClassOption: (classOption: IClass) => void;

  unitLesson: IClassManager[];
  setUnitLesson: (unitLesson: IClassManager[]) => void;
};
const useUnitLesson = create<UnitType>((set) => ({
  classOption: undefined,
  setClassOption: (classOption: IClass) => set(() => ({ classOption })),

  unitLesson: [],
  setUnitLesson: (unitLesson: IClassManager[]) => set(() => ({ unitLesson })),
}));

export default useUnitLesson;
