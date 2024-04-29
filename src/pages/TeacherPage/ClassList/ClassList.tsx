import { Box } from '@mui/material';
import { Button } from 'antd';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/app.context';
import { IResponseClassList } from '../../../untils';
import { useClassList } from './ClassList.context';

const ClassList = () => {
  const navigation = useNavigate();
  const { optionsReactTableDefault } = useApp();
  const { classList } = useClassList();
  const columns = useMemo<MRT_ColumnDef<IResponseClassList>[]>(() => {
    console.log();
    return [
      {
        header: 'Khóa học',
        accessorKey: 'courseName',
      },
      {
        header: 'Khối',
        accessorKey: 'blockId',
      },
      {
        header: 'Lớp',
        accessorKey: 'name',
      },
    ];
  }, [classList.length]);

  const table = useMaterialReactTable({
    ...optionsReactTableDefault,
    columns,
    data: classList,
    groupedColumnMode: 'remove',
    initialState: {
      expanded: true, //expand all groups by default
      grouping: ['courseName', 'blockId'], //an array of columns to group by by default (can be multiple)
      ...optionsReactTableDefault.initialState,
    },

    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button
          type="primary"
          size={'small'}
          onClick={() => navigation(`/class-manager/${row.original.id}`)}
        >
          Quản lý
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default ClassList;
