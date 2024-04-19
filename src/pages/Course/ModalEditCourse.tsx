import { DatePickerProps } from 'antd';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getCourse, updateCourse } from '../../api/course.api';
import useFetchData from '../../hooks/useFetchData';
import ModalCourse from './Modal';

interface IPropsType {
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  id: number;
  renderCourses: () => void;
}

function ModalEditCourse({
  isModalOpen,
  setIsModalOpen,
  id,
  renderCourses,
}: IPropsType) {
  const { fetch } = useFetchData({
    api: getCourse,
    params: id,
  });
  const [from, setFrom] = useState<number | null>(null);
  const [to, setTo] = useState<number | null>(null);

  const handleOk = async () => {
    const data = {
      from: Number(from),
      to: Number(to),
      id,
    };

    try {
      await updateCourse(id, data);
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

  useEffect(() => {
    (async () => {
      const data = await fetch();
      setFrom(data?.from);
      setTo(data?.to);
    })();
  }, [id]);

  return (
    <>
      {from !== null && to !== null && (
        <ModalCourse
          handleOk={handleOk}
          isModalOpen={isModalOpen}
          onChangeFrom={onChangeFrom}
          onChangeTo={onChangeTo}
          setIsModalOpen={setIsModalOpen}
          from={from}
          to={to}
        />
      )}
    </>
  );
}

export default ModalEditCourse;
