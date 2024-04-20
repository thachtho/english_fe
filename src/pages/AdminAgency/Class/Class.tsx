import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteClass } from '../../../api/class.api';
import { DeleteIcon, EditIcon } from '../../../components';
import ModalConfirm from '../../../components/Modal/Confirm';
import { useApp } from '../../../context/app.context';
import { BLOCKS } from '../../../shared/constants';
import AddClass from './AddClass';
import DropdownCourse from './DropdownCourse';
import EditClass from './EditClass';
import useClass from './hooks/useClass';
import { useNavigate } from 'react-router-dom';

const Class = () => {
  const navigation = useNavigate();
  const { height } = useApp();
  const {
    getDataClass,
    classs,
    teachers,
    courseId,
    dataTeachersDropdown,
    courses,
    setCourseIdSelected,
  } = useClass();

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] =
    useState(false);
  const [idEditSelected, setIdEditSelected] = useState<number | null>(null);
  const [idDelete, setIdDelete] = useState<null | number>(null);

  const navigateDetail = (id: number) => {
    navigation(`/class/${id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteClass(Number(idDelete));
      return getDataClass();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const columns = useMemo<MRT_ColumnDef<IClass>[]>(() => {
    return [
      {
        header: 'Tên lớp',
        accessorKey: 'name',
      },
      {
        accessorFn: (row) => {
          const teacherId = row.teacherId;
          const teacher = teachers.find((teacher) => teacher.id === teacherId);

          return teacher ? teacher.fullname : '';
        },
        header: 'Giáo viên',
        accessorKey: 'teacherId',
      },
      {
        accessorFn: (row) => {
          const blockId = row.blockId;
          const block = BLOCKS.find((block) => block.value === blockId);

          return block ? block.label : '';
        },
        header: 'Khối',
        accessorKey: 'blockId',
      },
    ];
  }, [teachers.length, courseId]);

  const table = useMaterialReactTable({
    columns,
    data: classs,
    enableGrouping: true,
    enableBottomToolbar: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: false,
    enableEditing: true,
    initialState: {
      expanded: true, //expand all groups by default
      grouping: ['blockId'], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
    },
    muiTableContainerProps: { sx: { maxHeight: `${height - 180}px` } },

    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setIsModalEditOpen(true);
              setIdEditSelected(row.original.id);
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
              setIdDelete(row.original.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <button
          className="text-primary"
          onClick={() => navigateDetail(row.original.id)}
        >
          Chi tiết
        </button>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <div className="flex">
        <Button
          variant="contained"
          onClick={() => {
            setIsModalAddOpen(true); //simplest way to open the create row modal with no default values
          }}
        >
          Add
        </Button>
        <div className="ml-5">
          <DropdownCourse
            courseId={Number(courseId)}
            courses={courses}
            setCourseIdSelected={setCourseIdSelected}
          />
        </div>
      </div>
    ),
  });

  return (
    <Stack gap="1rem">
      <MaterialReactTable table={table} />
      {isModalAddOpen && (
        <AddClass
          setIsModalOpen={setIsModalAddOpen}
          isModalOpen={isModalAddOpen}
          getDataClass={getDataClass}
          courseId={Number(courseId)}
          teachers={teachers}
          dataTeachersDropdown={dataTeachersDropdown}
        />
      )}
      {isModalEditOpen && (
        <EditClass
          setIsModalOpen={setIsModalEditOpen}
          isModalOpen={isModalEditOpen}
          getDataClass={getDataClass}
          idEditSelected={idEditSelected}
          dataClass={classs}
          teachers={teachers}
          courseId={Number(courseId)}
          dataTeachersDropdown={dataTeachersDropdown}
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

export default Class;
