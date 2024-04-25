import { Box } from '@mui/material';
import {
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
} from 'material-react-table';
import { useMemo, useState } from 'react';
import { useApp } from '../../../../context/app.context';
import Lesson from './Lesson/Lesson';
import Unit from './Unit/Unit';
import { data, type Person } from './makeData';

const UnitLesson = () => {
  const { optionsReactTableDefault } = useApp();
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
    //end
  );

  const [data1, setData1] = useState<Person[]>(() => data.slice(0, 3));
  const [data2, setData2] = useState<Person[]>(() => data.slice(3, 5));

  const [draggingRow, setDraggingRow] = useState<MRT_Row<Person> | null>(null);
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);

  const commonTableProps: Partial<MRT_TableOptions<Person>> & {
    columns: MRT_ColumnDef<Person>[];
  } = {
    columns,
    enableFullScreenToggle: false,
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow },
    ...optionsReactTableDefault,
    initialState: {
      ...optionsReactTableDefault.initialState,
    },
  };

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
          data1={data1}
          hoveredTable={hoveredTable}
          setData1={setData1}
          setData2={setData2}
          setHoveredTable={setHoveredTable}
          draggingRow={draggingRow}
        />
        <Lesson
          commonTableProps={commonTableProps}
          data2={data2}
          hoveredTable={hoveredTable}
          setData1={setData1}
          setData2={setData2}
          setHoveredTable={setHoveredTable}
          draggingRow={draggingRow}
        />
      </Box>
    </>
  );
};

export default UnitLesson;
