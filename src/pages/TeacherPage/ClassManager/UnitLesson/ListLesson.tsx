import { Box, Switch } from '@mui/material';
import { IListLesson } from './UnitLesson';
import { activeClassManagerLesson } from '../../../../api/class-manager-lesson.api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useClassManager } from '../ClassManager.context';

function ListLesson({ lessons }: { lessons: IListLesson[] }) {
  const { setLessonIdSelected } = useClassManager();
  const handleGetVariable = (lessonId: number) => {
    setLessonIdSelected(lessonId);
  };

  const active = (active: boolean, classManagerLessonId: number) => {
    try {
      return activeClassManagerLesson(classManagerLessonId, {
        active,
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <Box>
      {lessons.map((item, i) => {
        return (
          <div key={i} className="flex mb-3 justify-center items-center">
            <div
              className="flex-1 bg-meta-3 p-2  cursor-pointer "
              onClick={() => handleGetVariable(item.id)}
            >
              {item.name}
            </div>
            <div className="flex-1 ml-2">
              Active:{' '}
              <SwitchCustom
                handleChange={active}
                active={item.active}
                classManagerLessonId={item.classManagerLessonId}
              />
            </div>
          </div>
        );
      })}
    </Box>
  );
}

export default ListLesson;

const SwitchCustom = ({
  active,
  handleChange,
  classManagerLessonId,
}: {
  active: boolean;
  classManagerLessonId: number;
  handleChange: any;
}) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    classManagerLessonId: number,
  ) => {
    setIsActive(e.target.checked);
    handleChange(e.target.checked, classManagerLessonId);
  };
  return (
    <Switch
      defaultChecked={isActive}
      onChange={(e) => onChange(e, classManagerLessonId)}
    />
  );
};
