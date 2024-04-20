import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getCourses } from '../../../../api/course.api';

function useFetchCourse() {
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    (async () => {
      await renderCourses();
    })();
  }, []);

  const renderCourses = async () => {
    try {
      const { data } = await getCourses();
      setCourses(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return {
    courses,
    renderCourses,
  };
}

export default useFetchCourse;
