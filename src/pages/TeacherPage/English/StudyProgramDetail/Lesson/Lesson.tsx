import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Button, Empty, Spin } from 'antd';
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { getLessonsByUnitId } from '../../../../../api/lesson.api';
import { DeleteIcon, EditIcon } from '../../../../../components';
import { useNavigate } from 'react-router-dom';

interface ILessonProps {
  commonTableProps: any;
  unitIdSelected: number | null;
}

function Lesson({ commonTableProps, unitIdSelected }: ILessonProps) {
  const navigation = useNavigate();
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Tên Lesson',
      },
    ],
    [],
  );
  const [lessons, setLessons] = useState<any[]>([]);
  const [isLoadding, setIsLoadding] = useState<boolean>(false); // Initial loading state

  const getDataLessons = async () => {
    if (unitIdSelected) {
      try {
        const { data } = await getLessonsByUnitId(Number(unitIdSelected));
        setLessons(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoadding(false); // Set loading state to false after fetching (regardless of success or error)
      }
    }
  };

  useEffect(() => {
    setIsLoadding(true); // Set loading state to true before fetching data
    const timeoutId = setTimeout(getDataLessons, 500); // Schedule data fetch after 3 seconds

    return () => clearTimeout(timeoutId); // Clear timeout on component unmount to prevent memory leaks
  }, [unitIdSelected]); // Dependency array ensures effect runs only when unitIdSelected changes

  const table = useMaterialReactTable({
    ...commonTableProps,
    columns,
    data: unitIdSelected ? lessons : [],
    defaultColumn: {
      size: 100,
    },
    getRowId: (originalRow) => `table-2-${originalRow.firstName}`,
    renderTopToolbarCustomActions: () => <Button type="primary">Add</Button>,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Tooltip title="Edit">
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Button
          type="primary"
          size={'small'}
          onClick={() =>
            navigation(`/english/lesson/${row.original.id}/variable`)
          }
        >
          Từ vựng
        </Button>
      </Box>
    ),
  });

  if (!unitIdSelected) {
    return (
      <div className="flex justify-center items-center">
        <Empty />
      </div>
    );
  }

  return (
    <div>
      <Typography color="success.main" component="span" variant="h4">
        Lesson
      </Typography>
      {isLoadding ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : (
        <MaterialReactTable table={table} /> // Render table when data is loaded
      )}
    </div>
  );
}

export default Lesson;
