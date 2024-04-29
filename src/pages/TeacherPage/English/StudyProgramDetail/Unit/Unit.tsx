import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Button } from 'antd';
import {
  LiteralUnion,
  MRT_ColumnDef,
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useMemo, useState } from 'react';
import { DeleteIcon, EditIcon } from '../../../../../components';
import useHandleCreateUpdate from '../../../../../hooks/handle/useHandleCreateUpdate';
import useRenderCreateRowDialogContent from '../../../../../hooks/handle/useRenderCreateRowDialogContent';
import { useStudyProgramDetail } from '../StudyProgramDetail.context';
import { validateUnit } from './validate';
import {
  createUnit,
  deleteUnit,
  updateUnit,
} from '../../../../../api/unit.api';
import useRenderEditRowDialogContent from '../../../../../hooks/handle/useRenderEditRowDialogContent';
import ModalConfirm from '../../../../../components/Modal/Confirm';

interface IUnitProps {
  commonTableProps: any;
  units: IUnit[];
  setUnitIdSelected: (id: number) => void;
  setIsReloadUnit: (isReload: boolean) => void;
  isReloadUnit: boolean;
}

interface IIputCreate extends Pick<IUnit, 'name' | 'studyProgramId'> {}

function Unit({
  commonTableProps,
  units,
  setUnitIdSelected,
  setIsReloadUnit,
  isReloadUnit,
}: IUnitProps) {
  const { studyProgramId } = useStudyProgramDetail();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [idUnitSelected, setIdUnitSelected] = useState<null | number>(null);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const { renderCreateRowDialogContent } =
    useRenderCreateRowDialogContent('Add Unit');
  const { renderEditRowDialogContent } =
    useRenderEditRowDialogContent('Edit Unit');
  const columns = useMemo<MRT_ColumnDef<IUnit>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Tên Unit',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );

  const { handleCreateUpdate: handleCreate } = useHandleCreateUpdate({
    validate: validateUnit,
    createOption: (values: Record<LiteralUnion<string, string>, any>) => {
      return {
        ...values,
        studyProgramId: Number(studyProgramId),
      };
    },
    handle: async ({ values }: { values: IIputCreate }) => {
      await createUnit(values);
      setIsReloadUnit(!isReloadUnit);
    },
    setValidationErrors,
    isCreate: true,
  });

  const { handleCreateUpdate: handleUpdate } = useHandleCreateUpdate({
    validate: validateUnit,
    handle: async ({ values, id }) => {
      updateUnit(Number(id), values);
      setIsReloadUnit(!isReloadUnit);
    },
    setValidationErrors,
    isEdit: true,
  });

  const handleSelectedRow = (row: MRT_Row<MRT_RowData>) => {
    setUnitIdSelected(row.original.id);
    setRowSelection(() => {
      return {
        [row.id]: true,
      };
    });
  };

  const handleDelete = () => {
    deleteUnit(Number(idUnitSelected));
    setIsReloadUnit(!isReloadUnit);
  };

  const table = useMaterialReactTable({
    ...commonTableProps,
    columns,
    data: units,
    getRowId: (originalRow) => `table-1-${originalRow.id}`,
    onCreatingRowSave: handleCreate,
    onEditingRowSave: handleUpdate,
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
    renderTopToolbarCustomActions: () => (
      <Button type="primary" onClick={() => table.setCreatingRow(true)}>
        Add
      </Button>
    ),
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleSelectedRow(row),
      selected: rowSelection[row.id],
      sx: {
        cursor: 'pointer',
      },
    }),
    onRowSelectionChange: setRowSelection,
    renderCreateRowDialogContent,
    renderEditRowDialogContent,
    state: { rowSelection },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Tooltip title="Edit">
          <IconButton color="primary" onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              setIsModalDeleteOpen(true);
              setIdUnitSelected(row.original.id);
            }}
          >
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
      <MaterialReactTable table={table} />
      {isModalDeleteOpen && (
        <ModalConfirm
          isOpen={isModalDeleteOpen}
          setIsOpen={setIsModalDeleteOpen}
          handle={handleDelete}
          message={'Xác nhận xóa?'}
        />
      )}
    </div>
  );
}

export default Unit;
