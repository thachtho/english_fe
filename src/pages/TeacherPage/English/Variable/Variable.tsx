import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import {
  LiteralUnion,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useMemo, useState } from 'react';

import {
  createVariable,
  deleteVariable,
  updateVariable,
} from '../../../../api/variable.api';
import { DeleteIcon, EditIcon } from '../../../../components';
import ModalConfirm from '../../../../components/Modal/Confirm';
import { useApp } from '../../../../context/app.context';
import useHandleCreateUpdate from '../../../../hooks/handle/useHandleCreateUpdate';
import useRenderCreateRowDialogContent from '../../../../hooks/handle/useRenderCreateRowDialogContent';
import useRenderEditRowDialogContent from '../../../../hooks/handle/useRenderEditRowDialogContent';
import Source from './Source';
import { useVariable } from './Variable.context';
import { validateVariable } from './validate';

interface IIputCreate extends Pick<IVariable, 'name' | 'vi' | 'lessonId'> {}

const Variable = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const { optionsReactTableDefault } = useApp();
  const { variables, lessonId, setIsReload, isReload } = useVariable();
  const [idVariableSelected, setIdVariableSelected] = useState<null | number>(
    null,
  );
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const { renderEditRowDialogContent } =
    useRenderEditRowDialogContent('Edit từ vựng');
  const { renderCreateRowDialogContent } =
    useRenderCreateRowDialogContent('Add từ vựng');

  const { handleCreateUpdate: handleCreate } = useHandleCreateUpdate({
    validate: validateVariable,
    createOption: (values: Record<LiteralUnion<string, string>, any>) => {
      return {
        ...values,
        lessonId: Number(lessonId),
      };
    },
    handle: async ({ values }: { values: IIputCreate }) => {
      await createVariable(values);
      setIsReload(!isReload);
    },
    setValidationErrors,
    isCreate: true,
  });

  const { handleCreateUpdate: handleUpdate } = useHandleCreateUpdate({
    validate: validateVariable,
    handle: async ({ values, id }) => {
      updateVariable(Number(id), values);
      setIsReload(!isReload);
    },
    setValidationErrors,
    isEdit: true,
  });

  const handleDelete = () => {
    deleteVariable(Number(idVariableSelected));
    setIsReload(!isReload);
  };

  const columns = useMemo<MRT_ColumnDef<IVariable>[]>(
    () => [
      {
        header: 'Từ vựng',
        accessorKey: 'name',
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
      {
        header: 'VI',
        accessorKey: 'vi',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.vi,
          helperText: validationErrors?.vi,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              vi: undefined,
            }),
        },
      },
      {
        header: 'Âm thanh',
        enableEditing: false,
        Cell: ({ row }) => {
          return <Source name={row.original.name} id={row.original.id} />;
        },
      },
    ],
    [validationErrors, variables.length],
  );

  const table = useMaterialReactTable({
    columns,
    data: variables,
    ...optionsReactTableDefault,
    initialState: {
      ...optionsReactTableDefault.initialState,
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
    enableEditing: true,
    onCreatingRowSave: handleCreate,
    onEditingRowSave: handleUpdate,
    renderCreateRowDialogContent,
    renderEditRowDialogContent,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              setIsModalDeleteOpen(true);
              setIdVariableSelected(row.original.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
        Add
      </Button>
    ),
  });

  return (
    <Stack gap="1rem">
      <MaterialReactTable table={table} />
      {isModalDeleteOpen && (
        <ModalConfirm
          isOpen={isModalDeleteOpen}
          setIsOpen={setIsModalDeleteOpen}
          handle={handleDelete}
          message={'Xác nhận xóa?'}
        />
      )}
    </Stack>
  );
};

export default Variable;

const classObj = {
  id: 1,
  name: '8A',
};

const unit = {
  id: 1,
  name: 'Unit 1',
};

const lesson = {
  id: 1,
  name: 'Lesson 1',
};

const variable = {
  id: 1,
  name: 'Apple',
};

const classUnit = {
  classId: 1,
  unitId: 1,
};

const classUnitLesson = {
  classUnitId: 1,
  lessonId: 1,
};
