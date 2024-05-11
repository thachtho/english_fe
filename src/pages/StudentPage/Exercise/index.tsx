import { Button, Form } from 'antd';
import useQueryUrl from '../../../hooks/useQueryUrl';
import useRestoreStateZustand from '../../../hooks/useRestoreStateZustand';
import WraperLayoutStudent from '../../../layout/WraperLayoutStudent';
import InputFiledExercise from './components/InputFiledExercise';
import {
  useCreateExercise,
  useFetDataClassManagerLesson,
  useGetExercise,
} from './hooks';
import { useHandleExcercise } from './hooks/handleExercise';
import useExercise from './state';
import { useCheckPermissonWithClassManagerLesson } from '../Variable/hooks';

function Exercise() {
  const classManagerLessonId = useQueryUrl('classManagerLessonId');
  const { restore, variable } = useExercise();
  useFetDataClassManagerLesson(classManagerLessonId);
  useRestoreStateZustand(restore);
  useCheckPermissonWithClassManagerLesson(classManagerLessonId);
  useCreateExercise(classManagerLessonId);
  useGetExercise(classManagerLessonId);
  const { handleSubmit } = useHandleExcercise();

  return (
    <WraperLayoutStudent iconHome={true} RightComponent={<span>Lesson 3</span>}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={() => handleSubmit()}
        autoComplete="off"
      >
        <div className="flex flex-col justify-center items-center">
          <b className="text-xl">{variable?.vi}</b>
          <div className="flex justify-center items-center mt-2">
            <span>Nhập: </span>
            <InputFiledExercise />
          </div>

          <Button
            type="primary"
            className="mt-2"
            onClick={() => handleSubmit()}
          >
            Ok
          </Button>
        </div>
      </Form>
    </WraperLayoutStudent>
  );
}

export default Exercise;
