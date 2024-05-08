import List from '@mui/material/List';
import { useParams } from 'react-router-dom';
import Loader from '../../../common/Loader';
import WraperLayoutStudent from '../../../layout/WraperLayoutStudent';
import { UnitItem } from './components/UnitItem';
import { useFetchDataUnitLessonInClass, useGetBreadCrumbs } from './hooks';
import useUnitLesson from './state';

function UnitLesson() {
  const { id: classId } = useParams();
  const { classOption, unitLesson } = useUnitLesson();
  const breadCrumb = useGetBreadCrumbs();
  useFetchDataUnitLessonInClass(classId);

  if (!classOption) {
    return <Loader />;
  }

  return (
    <>
      <WraperLayoutStudent breadCrumb={breadCrumb}>
        <List component="nav">
          {unitLesson.map((item, i) => {
            return <UnitItem key={i} item={item} />;
          })}
        </List>
      </WraperLayoutStudent>
    </>
  );
}

export default UnitLesson;
