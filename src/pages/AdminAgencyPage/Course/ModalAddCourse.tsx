import { DatePickerProps } from 'antd';
import { useState } from 'react';
import toast from 'react-hot-toast';

import ModalCourse from './Modal';
import dayjs from 'dayjs';
import { createCourse } from '../../../api/course.api';

interface IPropsType {
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  renderCourses: () => void;
}

function ModalAddCourse({
  isModalOpen,
  setIsModalOpen,
  renderCourses,
}: IPropsType) {
  const [from, setFrom] = useState<number | null>(dayjs().get('year'));
  const [to, setTo] = useState<number | null>(dayjs().get('year'));

  const handleOk = async () => {
    const data = {
      from: Number(from),
      to: Number(to),
    };

    try {
      await createCourse(data);
      setIsModalOpen(false);
      renderCourses();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const onChangeFrom: DatePickerProps['onChange'] = (date, dateString) => {
    setFrom(Number(dateString));
  };

  const onChangeTo: DatePickerProps['onChange'] = (date, dateString) => {
    setTo(Number(dateString));
  };

  return (
    <ModalCourse
      handleOk={handleOk}
      isModalOpen={isModalOpen}
      onChangeFrom={onChangeFrom}
      onChangeTo={onChangeTo}
      setIsModalOpen={setIsModalOpen}
      from={from}
      to={to}
    />
  );
}

export default ModalAddCourse;
