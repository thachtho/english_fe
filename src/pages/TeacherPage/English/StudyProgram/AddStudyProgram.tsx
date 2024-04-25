import { Modal } from 'antd';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Dropdown from '../../../../components/Dropdown';
import { BLOCKS } from '../../../../shared/constants';
import toast from 'react-hot-toast';
import { createStudyProgram } from '../../../../api/study.api';

interface IAddStudyProgramProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  renderData: () => void;
}

interface IHanlde {
  name: string;
}

function AddStudyProgram({
  isModalOpen,
  setIsModalOpen,
  renderData,
}: IAddStudyProgramProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IHanlde>();
  const [blockId, setBlockId] = useState<number | null>(null);
  const onSubmit: SubmitHandler<IHanlde> = async (data) => {
    const input = {
      name: data?.name,
      blockId: Number(blockId),
    };

    try {
      await createStudyProgram(input);
      setIsModalOpen(false);
      renderData();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeBlock = (value: number) => {
    setBlockId(value);
  };

  return (
    <Modal
      title={'Thêm'}
      open={isModalOpen}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleCancel}
    >
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Tên chương trình học
            </label>
            <input
              {...register('name', {
                required: true,
                maxLength: 50,
                minLength: 1,
              })}
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Khối
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <Dropdown
                data={BLOCKS}
                handleChange={handleChangeBlock}
                defaultValue={''}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddStudyProgram;
