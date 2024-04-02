import { useEffect } from 'react';
import ClassProvider from '../../context/class.context'
import Class from './Class'
import './index.scss'
import { useNavigate } from 'react-router-dom';
import useQueryUrl from '../../hooks/useQueryUrl';
import { getDefaultCourse } from '../../api/course.api';

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
