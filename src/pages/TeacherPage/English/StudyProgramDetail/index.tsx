import { useEffect } from 'react';
import KeepAliveCustom from '../../../../components/KeepAliveCustom';

import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getStudyProgram } from '../../../../api/study.api';
import { useTabs } from '../../../../context/tabs.context';
import { getKeyTab } from '../../../../untils';
import StudyProgramDetail from './StudyProgramDetail';
import StudyProgramDetailProvider from './StudyProgramDetail.context';

function index() {
  const { setTitleCurrentTab } = useTabs();
  const { id: studyProgramId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getStudyProgram(Number(studyProgramId));
        const key = getKeyTab(location as any);
        setTitleCurrentTab(`[${data.name}]`, key);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    })();
  }, [studyProgramId]);

  return (
    <>
      <KeepAliveCustom>
        <StudyProgramDetailProvider>
          <StudyProgramDetail />
        </StudyProgramDetailProvider>
      </KeepAliveCustom>
    </>
  );
}

export default index;
