import Dropdown from '../../../components/Dropdown';
import { BLOCKS } from '../../../shared/constants';

interface IProps {
  setValueSelected: (value: number) => void;
}

function DropdownBlocks({ setValueSelected }: IProps) {
  const handleChangeCourse = (value: number) => {
    setValueSelected(value);
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
