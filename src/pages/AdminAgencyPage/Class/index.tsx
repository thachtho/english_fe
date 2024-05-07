import { useEffect } from 'react';
import { getCourse, getDefaultCourse } from '../../../api/course.api';
import KeepAliveCustom from '../../../components/KeepAliveCustom';
import { useApp } from '../../../context/app.context';
import ClassProvider from '../../../context/class.context';
import Class from './Class';
import toast from 'react-hot-toast';
import { getKeyTab } from '../../../untils';
import { useTabs } from '../../../context/tabs.context';

function index() {
  const { courseIdSelected: courseId, setCourseIdSelected } = useApp();
  const { setTitleCurrentTab } = useTabs();

  useEffect(() => {
    (async () => {
      if (!courseId) {
        const { data: courseId } = await getDefaultCourse();

        if (courseId) {
          setCourseIdSelected(courseId);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (courseId) {
        try {
          const { data } = await getCourse(courseId);
          const courseName = `${data.from}-${data.to}`;
          const key = getKeyTab(location as any);
          setTitleCurrentTab(`[${courseName}]`, key);
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        }
      }
    })();
  }, [courseId]);

  if (!courseId) {
    return <></>;
  }

  return (
    <KeepAliveCustom>
      <ClassProvider>
        <Class />
      </ClassProvider>
    </KeepAliveCustom>
  );
}

export default index;
