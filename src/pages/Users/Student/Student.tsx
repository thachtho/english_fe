import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableOptions,
} from 'material-react-table';
import { useMemo, useState } from 'react';
import { DeleteIcon, EditIcon } from '../../../components';
import { useApp } from '../../../context/app.context';
import AddStudent from './AddStudent';
import useStudent from './hooks/useStudent';
import ModalConfirm from '../../../components/Modal/Confirm';
import { deleteUser, updateUser } from '../../../api/user/user.api';
import toast from 'react-hot-toast';

const Student = () => {
  const { height } = useApp();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [idStudentSelected, setIdStudentSelected] = useState<null | number>(
    null,
  );
  const { students, getDataStudent } = useStudent();

  const handleDelete = () => {
    deleteUser(Number(idStudentSelected));
    getDataStudent();
  };

  const handleSaveUser: MRT_TableOptions<IUser>['onEditingRowSave'] = async ({
    values,
    row,
  }) => {
    try {
      const data = {
        ...values,
        id: row.original.id,
      };

      await updateUser(row.original.id, data);
      table.setEditingRow(null); //exit editing mode
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        header: 'Tên học sinh',
        accessorKey: 'fullname',
      },
      {
        header: 'Nickname',
        accessorKey: 'nickname',
      },
    ],
    [],
  );
  const table = useMaterialReactTable({
    columns,
    data: students,
    enableGrouping: true,
    enableBottomToolbar: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: false,
    enableEditing: true,
    onEditingRowSave: handleSaveUser,
    muiTableContainerProps: { sx: { maxHeight: `${height - 180}px` } },
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Thêm học sinh</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Chỉnh sửa</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
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
              setIdStudentSelected(row.original.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button
        variant="contained"
        onClick={() => {
          setIsModalAddOpen(true); //simplest way to open the create row modal with no default values
        }}
      >
        Add
      </Button>
    ),
  });

  return (
    <Stack gap="1rem">
      <MaterialReactTable table={table} />
      {isModalAddOpen && (
        <AddStudent
          setIsModalOpen={setIsModalAddOpen}
          isModalOpen={isModalAddOpen}
          getDataStudent={getDataStudent}
        />
      )}

      {isModalDeleteOpen && (
        <ModalConfirm
          isOpen={isModalDeleteOpen}
          setIsOpen={setIsModalDeleteOpen}
          handle={() => handleDelete()}
          message={'Xác nhận xóa?'}
        />
      )}
    </Stack>
  );
};

export default Student;
