import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip
} from '@mui/material';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableOptions,
  MRT_Row,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { DeleteIcon, EditIcon } from '../../../components';
import AddStudent from './AddStudent';
import useStudent from './hooks/useStudent';


const Student = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    //column definitions...
    () => [
      {
        header: 'Tên học sinh',
        accessorKey: 'fullname',
      },
      {
        header: 'Nickname',
        accessorKey: 'nickname'
      },
    ],
    [],
    //end
  );

  //demo state
  const [height, setHeight] = useState(window.innerHeight);
  const { students, getDataStudent }= useStudent()

  const handleSaveUser: MRT_TableOptions<IUser>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    getDataStudent();
    table.setEditingRow(null); //exit editing mode
  };

  const openDeleteConfirmModal = (row: MRT_Row<IUser>) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log(row.original.id);
    }
  };


  const table = useMaterialReactTable({
    columns,
    data: students,
    enableGrouping: true,
    enableBottomToolbar: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: false,
    enableEditing: true,
    initialState: {
      expanded: true, //expand all groups by default
      // grouping: ['gender'], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
    },
    muiTableContainerProps: { sx: { maxHeight: `${(height-180)}px` } },
    onEditingRowSave: handleSaveUser,
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
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button
        variant="contained"
        onClick={() => {
          setIsModalOpen(true); //simplest way to open the create row modal with no default values
        }}
      >
        Add
      </Button>
    ),

  });

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }

    // Thêm sự kiện resize để cập nhật chiều cao màn hình khi kích thước màn hình thay đổi
    window.addEventListener('resize', handleResize);

    // Dọn dẹp sự kiện khi thành phần bị gỡ bỏ
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <Stack gap="1rem">
      <MaterialReactTable table={table} />
      {isModalOpen &&
        <AddStudent
          setIsModalOpen={setIsModalOpen} 
          isModalOpen={isModalOpen}
          getDataStudent={getDataStudent}
        />
      }
    </Stack>
  );
};

export default Student;

