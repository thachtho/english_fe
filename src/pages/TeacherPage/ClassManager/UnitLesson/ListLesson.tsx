import { Box } from '@mui/material';
import { Typography } from 'antd';

interface IListLessonProps {
  lessons: ILesson[];
}
function ListLesson({ lessons }: IListLessonProps) {
  const handleGetVariable = (lessonId: number) => {
    alert(lessonId);
  };
  return (
    <Box>
      {lessons.map((item, i) => {
        return (
          <div key={i}>
            <Typography
              className="bg-meta-3 mb-3 p-2 cursor-pointer"
              onClick={() => handleGetVariable(item.id)}
            >
              {item.name}
            </Typography>
          </div>
        );
      })}
    </Box>
  );
}

export default ListLesson;
