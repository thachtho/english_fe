import { useEffect } from 'react';
import ClassProvider from '../../context/class.context'
import Class from './Class'
import './index.scss'
import { useNavigate } from 'react-router-dom';
import useQueryUrl from '../../hooks/useQueryUrl';

function index() {
  const navigation = useNavigate();
  const course = useQueryUrl('course')

  useEffect(() => {
    if (!course) {
      navigation('/class?course=2012-2013')
    }
  }, [])

  console.log(1231231, course)

  return (
    <ClassProvider >
        <Class />
    </ClassProvider>
  )
}

export default index
