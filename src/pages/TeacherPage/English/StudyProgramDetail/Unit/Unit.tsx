import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Button } from 'antd';
import {
  MRT_ColumnDef,
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useMemo, useState } from 'react';
import { DeleteIcon, EditIcon } from '../../../../../components';

interface IUnitProps {
  commonTableProps: any;
  units: IUnit[];
  setUnitIdSelected: (id: number) => void;
}
function Unit({ commonTableProps, units, setUnitIdSelected }: IUnitProps) {
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const columns = useMemo<MRT_ColumnDef<IUnit>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'name',
        header: 'Tên Unit',
      },
    ],
    [],
    //end
  );

  const handleSelectedRow = (row: MRT_Row<MRT_RowData>) => {
    setUnitIdSelected(row.original.id);
    setRowSelection(() => {
      return {
        [row.id]: true, //this is a simple toggle implementation
      };
    });
  };

  const handleEditUnit = (unitId: number) => {
    alert(unitId);
  };

  const table1 = useMaterialReactTable({
    ...commonTableProps,
    columns,
    data: units,
    getRowId: (originalRow) => `table-1-${originalRow.id}`,

    renderTopToolbarCustomActions: () => <Button type="primary">Add</Button>,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleSelectedRow(row),
      selected: rowSelection[row.id],
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      },
    }),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Tooltip title="Edit">
          <IconButton
            color="primary"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              handleEditUnit(row.original.id);
              e.stopPropagation();
            }}
          >
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
  });

  return (
    <div>
      <Typography color="success.main" component="span" variant="h4">
        Unit
      </Typography>
      <MaterialReactTable table={table1} />
    </div>
  );
}

export default Unit;
