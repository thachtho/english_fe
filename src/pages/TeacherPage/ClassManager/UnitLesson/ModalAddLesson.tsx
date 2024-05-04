import { Modal } from 'antd';
import Dropdown from '../../../../components/Dropdown';
import useGetDataStudyPrograms from './useGetDataStudyPrograms';
import {
  renderDropdownStudyPrograms,
  renderDropdownUnits,
} from '../../../../untils';
import { useEffect, useState } from 'react';
import { getClassManager } from '../../../../api/class-manager.api';
import { getAllUnitLessonByStudyProgramId } from '../../../../api/unit.api';

interface IPropsModal {
  setIsModalOpen: (isShow: boolean) => void;
  isModalOpen: boolean;
  idClassManagerSelected: number;
  classOption: IClass | null;
}

function ModalAddLesson({
  setIsModalOpen,
  isModalOpen,
  idClassManagerSelected,
  classOption,
}: IPropsModal) {
  const { studyPrograms } = useGetDataStudyPrograms({
    blockId: Number(classOption?.blockId),
  });
  const [classManager, setClassManager] = useState<null | IClassManager>(null);
  const [units, setUnits] = useState<IUnit[]>([]);
  const dropdownStudyPrograms = renderDropdownStudyPrograms(studyPrograms);
  const dropdownUnits = renderDropdownUnits(units);

  useEffect(() => {
    (async () => {
      const { data } = await getClassManager(Number(idClassManagerSelected));
      const { data: units } = await getAllUnitLessonByStudyProgramId(
        data?.unit?.studyProgramId,
      );
      setUnits(units);
      setClassManager(data);
    })();
  }, []);

  return (
    <Modal
      title={'Add'}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
    >
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Chương trình học
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <Dropdown
                data={dropdownStudyPrograms}
                handleChange={() => {}}
                defaultValue={classManager?.unit.studyProgramId ?? ''}
              />
            </div>
          </div>
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Unit
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <Dropdown
                data={dropdownUnits}
                handleChange={() => {}}
                defaultValue={classManager?.unitId ?? ''}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddLesson;
