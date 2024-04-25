import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';

import { DeleteIcon, EditIcon } from '../../../../components';
import { useApp } from '../../../../context/app.context';
import AddStudyProgram from './AddStudyProgram';
import toast from 'react-hot-toast';
import { getStudyPrograms } from '../../../../api/study.api';

const StudyProgram = () => {
  const { optionsReactTableDefault } = useApp();
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
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
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
