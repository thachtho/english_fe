import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Dropdown from '../../../components/Dropdown';
import useValidator from '../../../hooks/validator';
import { BLOCKS } from '../../../shared/constants';
import toast from 'react-hot-toast';
import { getStudyProgramByBlockId } from '../../../api/study.api';

interface IPropsModal {
  setIsModalOpen: (isShow: boolean) => void;
  isModalOpen: boolean;
  classOtions: IClass | null;
}

interface IHanlde {
  className: string;
}

const ModalAddUnitLessonTolass = ({
  setIsModalOpen,
  isModalOpen,
  classOtions,
}: IPropsModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IHanlde>();
  const { validator } = useValidator();

  const [messageError, setMessageError] = useState('');
  const [studyPrograms, setStudyPrograms] = useState<IStudyProgram[]>([]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<IHanlde> = async (data) => {
    alert('onSubmit');
  };

  const handleChangeTeacher = (value: number) => {
    console.log(111);
  };

  const handleChangeBlock = (value: number) => {
    console.log(111);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getStudyProgramByBlockId(
          Number(classOtions?.blockId),
        );
        setStudyPrograms(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    })();
  }, []);
  console.log(111, studyPrograms);

  const dropdownStudyProgram = studyPrograms.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  return (
    <>
      <Modal
        title={'Add'}
        open={isModalOpen}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
      >
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Chương trình học
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                {dropdownStudyProgram.length > 0 && (
                  <Dropdown
                    data={dropdownStudyProgram}
                    handleChange={handleChangeBlock}
                    defaultValue={dropdownStudyProgram[0].value}
                  />
                )}
              </div>
            </div>
            {messageError.length > 0 && (
              <span className="text-meta-1">
                <i>{messageError}</i>
              </span>
            )}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Unit
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <Dropdown data={BLOCKS} handleChange={handleChangeBlock} />
              </div>
            </div>
            {messageError.length > 0 && (
              <span className="text-meta-1">
                <i>{messageError}</i>
              </span>
            )}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Lesson
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <Dropdown data={BLOCKS} handleChange={handleChangeBlock} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddUnitLessonTolass;
