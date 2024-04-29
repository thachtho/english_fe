import { Box } from '@mui/material';
import {
  type MRT_ColumnDef,
  type MRT_TableOptions,
} from 'material-react-table';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAllUnitLessonByStudyProgramId } from '../../../../api/unit.api';
import { useApp } from '../../../../context/app.context';
import Lesson from './Lesson/Lesson';
import { useStudyProgramDetail } from './StudyProgramDetail.context';
import Unit from './Unit/Unit';

const StudyProgramDetail = () => {
  const { optionsReactTableDefault } = useApp();
  const { studyProgramId } = useStudyProgramDetail();
  const [units, setUnits] = useState<IUnit[]>([]);
  const [unitIdSelected, setUnitIdSelected] = useState<number | null>(null);
  const [isReloadUnit, setIsReloadUnit] = useState<boolean>(false);
  const [isReloadLesson, setIsReloadLesson] = useState<boolean>(false);

  const commonTableProps: Partial<MRT_TableOptions<IUnit>> & {
    columns: MRT_ColumnDef<IUnit>[];
  } = {
    enableFullScreenToggle: false,
    ...optionsReactTableDefault,
    initialState: {
      ...optionsReactTableDefault.initialState,
    },
  };

  const getDataUnits = async () => {
    try {
      const { data } = await getAllUnitLessonByStudyProgramId(
        Number(studyProgramId),
      );

      setUnits(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    (async () => {
      await getDataUnits();
    })();
  }, [isReloadUnit]);

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'auto', lg: '1fr 1fr' },
          gap: '1rem',
          overflow: 'auto',
          p: '4px',
        }}
      >
        <Unit
          commonTableProps={commonTableProps}
          units={units}
          setUnitIdSelected={setUnitIdSelected}
          setIsReloadUnit={setIsReloadUnit}
          isReloadUnit={isReloadUnit}
        />

        <Lesson
          commonTableProps={commonTableProps}
          unitIdSelected={unitIdSelected}
          isReloadLesson={isReloadLesson}
          setIsReloadLesson={setIsReloadLesson}
        />
      </Box>
    </>
  );
};

export default StudyProgramDetail;
