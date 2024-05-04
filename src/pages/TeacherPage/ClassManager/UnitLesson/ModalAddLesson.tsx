import { Modal } from 'antd';
import { useState } from 'react';
import Dropdown from '../../../../components/Dropdown';
import useFetchDataAddLesson from './hooks/useFetchDataAddLesson';
import { validateAddLesson } from './validate';

interface IPropsModal {
  setIsModalOpen: (isShow: boolean) => void;
  isModalOpen: boolean;
  idClassManagerSelected: number;
  classOption: IClass | null;
  handle: (option: { lessonId: number; classManagerId: number }) => void;
}

interface IMessageError {
  unit: string;
  lesson: string;
}

function ModalAddLesson({
  setIsModalOpen,
  isModalOpen,
  idClassManagerSelected,
  classOption,
  handle,
}: IPropsModal) {
  const {
    classManager,
    dropdownLessons,
    dropdownStudyPrograms,
    dropdownUnits,
    unitId,
    setUnitId,
  } = useFetchDataAddLesson(
    idClassManagerSelected,
    Number(classOption?.blockId),
  );
  const [messageError, setMessageError] = useState<IMessageError>({
    unit: '',
    lesson: '',
  });
  const [lessonId, setLessonId] = useState<null | number>(null);

  const onOk = () => {
    const newValidationErrors = validateAddLesson({
      lessonId,
      unitId,
    });
    if (Object.values(newValidationErrors).some((error) => error)) {
      setMessageError(newValidationErrors);
      return;
    }
    const input = {
      classManagerId: Number(idClassManagerSelected),
      lessonId: Number(lessonId),
    };
    return handle(input);
  };

  const handleChangeUnit = (unitId: number) => {
    setMessageError((prev) => {
      return {
        ...prev,
        unit: '',
      };
    });
    setUnitId(unitId);
  };

  const handleChangeLesson = (lessonId: number) => {
    setMessageError((prev) => {
      return {
        ...prev,
        lesson: '',
      };
    });
    setLessonId(lessonId);
  };
  return (
    <Modal
      title={'Add'}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={onOk}
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
                defaultValue={classManager?.unit?.studyProgramId ?? ''}
                setKey={true}
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
                handleChange={handleChangeUnit}
                defaultValue={unitId ?? ''}
                setKey={true}
              />
            </div>
            {messageError.unit.length > 0 && (
              <span className="text-meta-1">
                <i>{messageError.unit}</i>
              </span>
            )}
          </div>
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Lesson
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <Dropdown
                data={dropdownLessons}
                handleChange={handleChangeLesson}
                defaultValue={lessonId || ''}
              />
            </div>
            {messageError.lesson.length > 0 && (
              <span className="text-meta-1">
                <i>{messageError.lesson}</i>
              </span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddLesson;
