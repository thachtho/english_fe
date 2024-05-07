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
} from 'material-react-table';
import { useMemo, useState } from 'react';

import useFetchCourse from './hooks/useFetchCourse';
import ModalEditCourse from './ModalEditCourse';
import ModalAddCourse from './ModalAddCourse';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/app.context';
import { deleteCourse } from '../../../api/course.api';
import { DeleteIcon, EditIcon } from '../../../components';
import ModalConfirm from '../../../components/Modal/Confirm';

const Student = () => {
  const navigation = useNavigate();
  const { setCourseIdSelected, optionsReactTableDefault } = useApp();
  const { courses, renderCourses } = useFetchCourse();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] =
    useState(false);
  const [idSelected, setIdSelected] = useState<null | number>(null);
  const navigateClass = (id: number) => {
    setCourseIdSelected(id);
    navigation(`/class`);
  };

  const handleDelete = async () => {
    try {
      await deleteCourse(Number(idSelected));

      return renderCourses();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const columns = useMemo<MRT_ColumnDef<ICourse>[]>(
    () => [
      {
        header: 'Khoa hoc',
        accessorKey: 'from',
        Cell: (row) => {
          const { from, to } = row.row.original;

          return <div>{`${from}-${to}`}</div>;
        },
      },
    ],
    [],
  );
  const table = useMaterialReactTable({
    columns,
    data: courses,
    ...optionsReactTableDefault,
    initialState: {
      ...optionsReactTableDefault.initialState,
    },
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
          <IconButton
            onClick={() => {
              setIsModalEditOpen(true);
              setIdSelected(row.original.id);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              setIsModalConfirmDeleteOpen(true);
              setIdSelected(row.original.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <button
          className="text-primary"
          onClick={() => navigateClass(row.original.id)}
        >
          Chi tiết
        </button>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button
        variant="contained"
        onClick={() => {
          setIsModalAddOpen(true);
        }}
      >
        Add
      </Button>
    ),
  });

  return (
    <Stack gap="1rem">
      <MaterialReactTable table={table} />

      {isModalEditOpen && idSelected && (
        <ModalEditCourse
          isModalOpen={isModalEditOpen}
          setIsModalOpen={setIsModalEditOpen}
          renderCourses={renderCourses}
          id={idSelected}
        />
      )}

      {isModalAddOpen && (
        <ModalAddCourse
          isModalOpen={isModalAddOpen}
          setIsModalOpen={setIsModalAddOpen}
          renderCourses={renderCourses}
        />
      )}
      {isModalConfirmDeleteOpen && (
        <ModalConfirm
          isOpen={isModalConfirmDeleteOpen}
          setIsOpen={setIsModalConfirmDeleteOpen}
          handle={handleDelete}
          message={'Xác nhận xóa?'}
        />
      )}
    </Stack>
  );
};

export default Student;
