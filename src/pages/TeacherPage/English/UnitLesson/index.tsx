import KeepAliveCustom from '../../../../components/KeepAliveCustom';
import UnitLesson from './UnitLesson';
import UnitLessonProvider from './UnitLesson.context';

function index() {
  return (
    <>
      <KeepAliveCustom>
        <UnitLessonProvider>
          <UnitLesson />
        </UnitLessonProvider>
      </KeepAliveCustom>
    </>
  );
}

export default index;
