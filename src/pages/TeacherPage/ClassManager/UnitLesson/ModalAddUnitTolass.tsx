import { Modal } from 'antd';
import { useState } from 'react';
import { getAllUnitLessonByStudyProgramId } from '../../../../api/unit.api';
import Dropdown from '../../../../components/Dropdown';
import useGetDataStudyPrograms from './useGetDataStudyPrograms';
import { validateAddUnitLesson } from './validate';
import {
  renderDropdownStudyPrograms,
  renderDropdownUnits,
} from '../../../../untils';

interface IPropsModal {
  setIsModalOpen: (isShow: boolean) => void;
  isModalOpen: boolean;
  classOption: IClass | null;
  handle: (option: IOptionState) => void;
}

export interface IOptionState {
  studyProgramId: number | null;
  unitId: number | null;
}

interface IMessageError {
  studyProgram: string;
  unit: string;
}

const ModalAddUnitTolass = ({
  setIsModalOpen,
  isModalOpen,
  classOption,
  handle,
}: IPropsModal) => {
  const [messageError, setMessageError] = useState<IMessageError>({
    studyProgram: '',
    unit: '',
  });
  const { setStudyPrograms, studyPrograms } = useGetDataStudyPrograms({
    blockId: Number(classOption?.blockId),
  });
  const [units, setUnits] = useState<IUnit[]>([]);
  const [options, setOptions] = useState<IOptionState>({
    studyProgramId: null,
    unitId: null,
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    setUnits([]);
    setStudyPrograms([]);
    setOptions({
      studyProgramId: null,
      unitId: null,
    });
  };

  const onSubmit = async () => {
    const newValidationErrors = validateAddUnitLesson(options);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setMessageError(newValidationErrors);
      return;
    }
    handle(options);
  };

  const handleSetUnit = async (studyProgramId: number) => {
    const { data: units } = await getAllUnitLessonByStudyProgramId(
      studyProgramId,
    );
    setUnits(units);
  };

  const handleChangeUnit = (unitId: number) => {
    setMessageError((prev) => {
      return {
        ...prev,
        unit: '',
      };
    });
    setOptions({
      ...options,
      unitId,
    });
  };

  const handleChangeStudyProgram = (studyProgramId: number) => {
    setMessageError((prev) => {
      return {
        ...prev,
        studyProgram: '',
      };
    });
    setOptions({
      ...options,
      studyProgramId,
    });
    handleSetUnit(studyProgramId);
  };

  const dropdownStudyPrograms = renderDropdownStudyPrograms(studyPrograms);
  const dropdownUnits = renderDropdownUnits(units);

  return (
    <>
      <Modal
        title={'Add'}
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={handleCancel}
      >
        {dropdownStudyPrograms.length > 0 ? (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Chương trình học
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  {dropdownStudyPrograms.length > 0 && (
                    <Dropdown
                      data={dropdownStudyPrograms}
                      handleChange={handleChangeStudyProgram}
                    />
                  )}
                </div>
              </div>
              {messageError.studyProgram.length > 0 && (
                <span className="text-meta-1">
                  <i>{messageError.studyProgram}</i>
                </span>
              )}
              {dropdownUnits.length > 0 && (
                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Unit
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <Dropdown
                      data={dropdownUnits}
                      handleChange={handleChangeUnit}
                    />
                  </div>
                </div>
              )}

              {messageError.unit.length > 0 && (
                <span className="text-meta-1">
                  <i>{messageError.unit}</i>
                </span>
              )}
            </div>
          </div>
        ) : (
          'Chưa có chương trình học nào'
        )}
      </Modal>
    </>
  );
};

export default ModalAddUnitTolass;
