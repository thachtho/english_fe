import Dropdown from '../../../components/Dropdown';
import { BLOCKS } from '../../../shared/constants';

interface IProps {
  setCourseIdSelected: (value: number) => void;
}

function DropdownBlocks({ setCourseIdSelected }: IProps) {
  const handleChangeCourse = (value: number) => {
    alert(value);
  };

  return (
    <div className="flex justify-center items-center cursor-pointer ml-2">
      <span>Khối:</span>
      <Dropdown
        data={BLOCKS}
        defaultValue={10}
        handleChange={handleChangeCourse}
      />
    </div>
  );
}

export default DropdownBlocks;
