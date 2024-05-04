import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getStudyProgramByBlockId } from '../../../../api/study.api';

interface IProps {
  blockId: number;
}

function useGetDataStudyPrograms({ blockId }: IProps) {
  const [studyPrograms, setStudyPrograms] = useState<IStudyProgram[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data: studyPrograms } = await getStudyProgramByBlockId(
          Number(blockId),
        );
        setStudyPrograms(studyPrograms);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    })();
  }, []);

  return {
    studyPrograms,
    setStudyPrograms,
  };
}

export default useGetDataStudyPrograms;
