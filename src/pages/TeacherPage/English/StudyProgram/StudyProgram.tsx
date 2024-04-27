import { Box, Button, Stack } from '@mui/material';
import { Button as ButtonAntd } from 'antd';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';

import toast from 'react-hot-toast';
import { getStudyPrograms } from '../../../../api/study.api';
import { useApp } from '../../../../context/app.context';
import AddStudyProgram from './AddStudyProgram';
import { useNavigate } from 'react-router-dom';

const StudyProgram = () => {
  const navigation = useNavigate();
  const { optionsReactTableDefault, setStudyProgramIdSelected } = useApp();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [studyPrograms, setStudyPrograms] = useState<IStudyProgram[]>([]);

  const handleGetStudyPrograms = async () => {
    try {
      const { data } = await getStudyPrograms();
      setStudyPrograms(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const navigationUnitLesson = (studyProgramId: number) => {
    setStudyProgramIdSelected(studyProgramId);
    navigation(`/english/study-program/${studyProgramId}`);
  };

  useEffect(() => {
    handleGetStudyPrograms();
  }, []);

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        header: 'Tên chương trình học',
        accessorKey: 'name',
      },
      {
        header: 'Khối',
        accessorKey: 'blockId',
      },
    ],
    [studyPrograms.length],
  );
  const table = useMaterialReactTable({
    columns,
    data: studyPrograms,
    ...optionsReactTableDefault,
    initialState: {
      ...optionsReactTableDefault.initialState,
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <ButtonAntd
          type="primary"
          size={'small'}
          onClick={() => navigationUnitLesson(row.original.id)}
        >
          Soạn giáo trình
        </ButtonAntd>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={() => setIsModalAddOpen(true)}>
        Add
      </Button>
    ),
  });

  return (
    <Stack gap="1rem">
      <MaterialReactTable table={table} />
      {isModalAddOpen && (
        <AddStudyProgram
          setIsModalOpen={setIsModalAddOpen}
          isModalOpen={isModalAddOpen}
          renderData={handleGetStudyPrograms}
        />
      )}
    </Stack>
  );
};

export default StudyProgram;
