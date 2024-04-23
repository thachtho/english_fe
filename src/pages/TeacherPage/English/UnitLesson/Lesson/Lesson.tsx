import { Typography } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
interface ILessonProps {
  data2: any[];
  commonTableProps: any;
  hoveredTable: any;
  setData2: any;
  setData1: any;
  setHoveredTable: any;
  draggingRow: any;
}
function Lesson({
  commonTableProps,
  data2,
  hoveredTable,
  setData1,
  setData2,
  setHoveredTable,
  draggingRow,
}: ILessonProps) {
  const table2 = useMaterialReactTable({
    ...commonTableProps,
    data: data2,
    defaultColumn: {
      size: 100,
    },
    getRowId: (originalRow) => `table-2-${originalRow.firstName}`,
    muiRowDragHandleProps: {
      onDragEnd: () => {
        if (hoveredTable === 'table-1') {
          setData1((data1: any) => [...data1, draggingRow!.original]);
          setData2((data2: any) =>
            data2.filter((d: any) => d !== draggingRow!.original),
          );
        }
        setHoveredTable(null);
      },
    },
    muiTablePaperProps: {
      onDragEnter: () => setHoveredTable('table-2'),
      sx: {
        outline: hoveredTable === 'table-2' ? '2px dashed pink' : undefined,
      },
    },
    renderTopToolbarCustomActions: () => (
      <Typography color="error.main" component="span" variant="h4">
        Lesson
      </Typography>
    ),
  });
  return <MaterialReactTable table={table2} />;
}

export default Lesson;
