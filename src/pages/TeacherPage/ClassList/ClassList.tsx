import { Box, Stack } from '@mui/material';
import { Button } from 'antd';
import {
  MRT_ExpandAllButton,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useMemo } from 'react';
import { useApp } from '../../../context/app.context';
import { IResponseClassList } from '../../../untils';
import { useClassList } from './ClassList.context';

const ClassList = () => {
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
    displayColumnDefOptions: {
      'mrt-row-expand': {
        Header: () => (
          <Stack direction="row" alignItems="center">
            <MRT_ExpandAllButton table={table} />
            <Box>Groups</Box>
          </Stack>
        ),
        GroupedCell: ({ row, table }) => {
          const { grouping } = table.getState();
          return row.getValue(grouping[grouping.length - 1]);
        },
        enableResizing: true,
        muiTableBodyCellProps: ({ row }) => ({
          sx: (theme) => ({
            color:
              row.depth === 0
                ? theme.palette.primary.main
                : row.depth === 1
                ? theme.palette.secondary.main
                : undefined,
          }),
        }),
        size: 200,
      },
    },
    groupedColumnMode: 'remove',
    initialState: {
      expanded: true, //expand all groups by default
      grouping: ['courseName', 'blockId'], //an array of columns to group by by default (can be multiple)
      ...optionsReactTableDefault.initialState,
    },

    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button type="primary" size={'small'} onClick={() => alert()}>
          Quản lý
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default ClassList;