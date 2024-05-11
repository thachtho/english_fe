import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  classManagerLessonId: number;
};
function ButtonExercise({ classManagerLessonId }: PropsType) {
  const navigation = useNavigate();

  return (
    <Button
      type="primary"
      onClick={() =>
        navigation(
          `/studentPage/exercise?classManagerLessonId=${classManagerLessonId}`,
        )
      }
    >
      Bài tập
    </Button>
  );
}

export default ButtonExercise;
