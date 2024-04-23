import { Typography } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useEffect, useState } from 'react';
import { getUnits } from '../../../../../api/unit.api';

interface IUnitProps {
  data1: any[];
  commonTableProps: any;
  hoveredTable: any;
  setData2: any;
  setData1: any;
  setHoveredTable: any;
  draggingRow: any;
}
function Unit({
  commonTableProps,
  data1,
  hoveredTable,
  setData1,
  setData2,
  setHoveredTable,
  draggingRow,
}: IUnitProps) {
  const [units, setUnits] = useState<IUnit[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await getUnits();
      console.log(2222, data);
    };
    try {
      fetch();
    } catch (error) {}
  }, []);

  const table1 = useMaterialReactTable({
    ...commonTableProps,
    data: data1,
    getRowId: (originalRow) => `table-1-${originalRow.firstName}`,
    muiRowDragHandleProps: {
      onDragEnd: () => {
        if (hoveredTable === 'table-2') {
          setData2((data2: any) => [...data2, draggingRow!.original]);
          setData1((data1: any) =>
            data1.filter((d: any) => d !== draggingRow!.original),
          );
        }
        setHoveredTable(null);
      },
    },
    muiTablePaperProps: {
      onDragEnter: () => setHoveredTable('table-1'),
      sx: {
        outline: hoveredTable === 'table-1' ? '2px dashed pink' : undefined,
      },
    },
    renderTopToolbarCustomActions: () => (
      <Typography color="success.main" component="span" variant="h4">
        UNit
      </Typography>
    ),
  });
  return <MaterialReactTable table={table1} />;
}

export default Unit;
