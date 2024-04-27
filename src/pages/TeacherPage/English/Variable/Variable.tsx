import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import {
  MRT_TableOptions,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useMemo, useState } from 'react';

import { DeleteIcon, EditIcon } from '../../../../components';
import { useApp } from '../../../../context/app.context';
import useRenderCreateRowDialogContent from '../../../../hooks/handle/useRenderCreateRowDialogContent';
import useRenderEditRowDialogContent from '../../../../hooks/handle/useRenderEditRowDialogContent';
import { checkRequired } from '../../../../untils/validate';
import { useVariable } from './Variable.context';
import Source from './Source';

const Variable = () => {
  const { optionsReactTableDefault } = useApp();
  const { variables } = useVariable();
  const { renderEditRowDialogContent } =
    useRenderEditRowDialogContent('Edit từ vựng');
  const { renderCreateRowDialogContent } =
    useRenderCreateRowDialogContent('Add từ vựng');
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

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
        header: 'Âm thanh',
        Cell: ({ row }) => {
          return <Source name={row.original.name} id={row.original.id} />;
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
    ],
    [validationErrors, variables.length],
  );

  const handleCreateVariable: MRT_TableOptions<IVariable>['onCreatingRowSave'] =
    async ({ values, table }) => {
      const newValidationErrors = validateVariable(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      table.setCreatingRow(null); //exit creating mode
    };
  const handleEditVariable: MRT_TableOptions<IVariable>['onEditingRowSave'] =
    async ({ values, table, row }) => {
      const newValidationErrors = validateVariable(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      table.setEditingRow(null); //exit editing mode
    };

  function validateVariable(variable: IVariable) {
    return {
      name: !checkRequired(variable.name) ? 'Từ vựng không được để trống!' : '',
      vi: !checkRequired(variable.vi) ? 'Nghĩa không được để trống' : '',
    };
  }

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
    onCreatingRowSave: handleCreateVariable,
    onEditingRowSave: handleEditVariable,
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
          <IconButton color="error">
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
    </Stack>
  );
};

export default Variable;
