import {
  Box,
  IconButton,
  Stack,
  Tooltip
} from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { deleteLink, getLinks } from "../../../api/link.api";
import { useApp } from "../../../common/context/app.context";
import { DeleteIcon, EditIcon } from "../../../components";
import { ILink, LinkType } from "../../../shared/interfaces/link";
import ModalAddLink from "./ModalAddLink";
import Loader from '../../../common/Loader';
import toast from 'react-hot-toast';
import ModalEditLink from './ModalEditLink';
import { Button } from 'antd';
import Pagination from '../../../components/Pagination/Pagination';

function Link() {
  const { optionsReactTableDefault } = useApp();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [links, setLinks] = useState<ILink[] | null>(null);
  const [linkEdit, setLinkEdit] = useState<ILink | null>(null);
  const [isReload, setIsReload] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(100)
  const [totalCount, setTotalCount] = useState<number>(0)

  useEffect(() => {
    (async () => {
      const res = await getLinks(pageSize, pageSize * (page ? page - 1 : 0) )
      setLinks(res.data.data)
      setTotalCount(res.data.totalCount)
    })()
  }, [isReload, page, pageSize])
  
  const columns = useMemo<MRT_ColumnDef<ILink>[]>(
    () => [
      {
        header: 'Nguồn',
        accessorKey: 'linkName',
        size: 200,
      },
      {
        header: 'Content',
        accessorKey: 'content',
        size: 200,
        Cell: (props) => {
          const content = props.row.original.content
          
          return content && content.length > 100 ? `${(content??"").slice(0, 100)}...` : content??"Trống"
        }
      },
      {
        header: 'Status',
        accessorKey: 'type',
        size: 50,
        muiTableHeadCellProps: { sx: { p: 0, m: 0, width: '50px' } },
        muiTableBodyCellProps: { sx: { p: 0, m: 0, width: '50px' } },
        Cell: (props) => {
          const type = props.row.original.type
          const status = getStatus(type)
          
          return <>
            <Button type='primary'>{status}</Button>
          </>
        }
      },
    ],
    [],
  );

  const getStatus = (type: LinkType) => {
    let status = "Đang chờ"
    if (type === "die") {
      return "Die"
    }
    if (type === "private" || type === "public") {
      return "Live"
    }

    return status
  }

  const table = useMaterialReactTable({
    columns,
    data: links??[],
    ...optionsReactTableDefault,
    enableBottomToolbar: true,
    initialState: {
      ...optionsReactTableDefault.initialState,
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Button type='primary'>Xem</Button>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setIsModalEditOpen(true);
              const link = (links??[]).find(item => item.id == row.original.id)
              link && setLinkEdit(link);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              handleDelele(row.original.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <button
          className="text-primary"
          // onClick={() => navigateClass(row.original.id)}
        >
          Comments
        </button>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button
        type='primary'
          onClick={() => {
            setIsModalAddOpen(true); 
          }}
      >
        Add
      </Button>
    ),
    renderBottomToolbar: () => (
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          totalCount={totalCount}
          pageSizeOptions={['100', "200", "300"]}
          setData={setLinks}
        />
      </Box>
    ),
  });


  const handleDelele = (id: number) => {
    toast("Xóa thành công!")    
    setIsReload(!isReload)
    return deleteLink(id)
  }

  return (
    <Stack gap="1rem">
      {!links ? <Loader /> :
        <MaterialReactTable table={table} />

      }
      {isModalAddOpen && (
        <ModalAddLink
          setIsModalOpen={setIsModalAddOpen}
          isModalOpen={isModalAddOpen}
          isReload={isReload}
          setIsReload={setIsReload}
        />
      )}
      {isModalEditOpen && linkEdit && (
        <ModalEditLink
          setIsModalOpen={setIsModalEditOpen}
          isModalOpen={isModalEditOpen}
          isReload={isReload}
          setIsReload={setIsReload}
          link={linkEdit}
        />
      )}

    </Stack>
  );
}

export default Link