import { Box, Stack } from '@mui/material';
import { Button as ButtonAntd } from 'antd';
import {
  MRT_ExpandAllButton,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useMemo } from 'react';
import { useApp } from '../../../../context/app.context';
import DropdownBlocks from '../DropdownBlocks';

const data = [
  { id: 1, unitName: 'Unit 1', lessonName: 'Lesson 1' },
  { id: 2, unitName: 'Unit 1', lessonName: 'Lesson 2' },
  { id: 3, unitName: 'Unit 2', lessonName: 'Lesson 1' },
  { id: 4, unitName: 'Unit 2', lessonName: 'Lesson 2' },
  { id: 5, unitName: 'Unit 2', lessonName: 'Lesson 3' },
];

const UnitLesson = () => {
  const { optionsReactTableDefault } = useApp();
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
    console.log();
    return [
      {
        header: 'Unit',
        accessorKey: 'unitName',
      },
      {
        header: 'Lesson',
        accessorKey: 'lessonName',
      },
    ];
  }, []);

  const table = useMaterialReactTable({
    ...optionsReactTableDefault,
    columns,
    data: data,
    displayColumnDefOptions: {
      'mrt-row-expand': {
        Header: () => (
          <Stack direction="row" alignItems="center">
            <MRT_ExpandAllButton table={table} />
            <Box>Unit</Box>
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
      grouping: ['unitName'], //an array of columns to group by by default (can be multiple)
      ...optionsReactTableDefault.initialState,
    },

    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <ButtonAntd type="primary" size={'small'} onClick={() => alert()}>
          Từ vựng
        </ButtonAntd>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <div className="flex">
        <ButtonAntd
          size="middle"
          type="primary"
          onClick={() => {
            alert();
          }}
        >
          Tạo Unit
        </ButtonAntd>
        <ButtonAntd
          className="ml-2"
          type="primary"
          onClick={() => {
            alert();
          }}
        >
          Tạo Lesson
        </ButtonAntd>

        <DropdownBlocks setCourseIdSelected={() => {}} />
      </div>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default UnitLesson;
