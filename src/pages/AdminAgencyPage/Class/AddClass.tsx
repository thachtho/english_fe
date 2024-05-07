import { createClass } from '../../../api/class.api';
import ModalClass from './Modal';

interface IPropsAddClass {
  setIsModalOpen: (isShow: boolean) => void;
  isModalOpen: boolean;
  getDataClass: () => void;
  courseId: number;
  teachers: IUser[];
  dataTeachersDropdown: IPropsDropdown[];
}

function AddClass({
  setIsModalOpen,
  isModalOpen,
  getDataClass,
  courseId,
  teachers,
  dataTeachersDropdown,
}: IPropsAddClass) {
  const handleAdd = async (values: {
    name: string;
    teacherId: number;
    blockId: number;
  }) => {
    return createClass({ ...values, courseId: Number(courseId) });
  };

  return (
    <ModalClass
      title="Thêm"
      setIsModalOpen={setIsModalOpen}
      isModalOpen={isModalOpen}
      getDataClass={getDataClass}
      handle={handleAdd}
      teachers={teachers}
      dataTeachersDropdown={dataTeachersDropdown}
    />
  );
}

export default AddClass;
