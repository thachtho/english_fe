import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDefaultCourse } from '../../api/course.api';
import ClassProvider from '../../context/class.context';
import useQueryUrl from '../../hooks/useQueryUrl';
import Class from './Class';

function index() {
  const navigation = useNavigate();
  const course = useQueryUrl('courseId')

  useEffect(() => {
    ( async () => {
      if (!course) {
        const { data: courseId } = await getDefaultCourse()

        if (courseId) {
          navigation(`/class?courseId=${courseId}`)
        }
      }
    })()

  }, [])

  if (!course) {
    return <></>
  }

  return (
    <ClassProvider >
        <Class />
    </ClassProvider>
  )
}

export default index
