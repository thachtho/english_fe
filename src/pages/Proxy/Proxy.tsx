import {
  Box,
  IconButton,
  Stack,
  Tooltip
} from '@mui/material';
import { Button } from 'antd';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { toast } from 'react-toastify';
import { deleteProxy, getProxies } from '../../api/proxy.api';
import { useApp } from '../../common/context/app.context';
import { DeleteIcon } from '../../components';
import ModalAddProxies from './ModalAddProxies';
import { IProxy } from '../../shared/interfaces/proxy';

function Proxy() {
  const { optionsReactTableDefault } = useApp();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [proxies, setProxies] = useState<IProxy[] | null>(null);
  const [isReload, setIsReload] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const res = await getProxies()
      setProxies(res.data)

    })()
  }, [isReload])

  const handleDelele = async (id: number) => {
    toast("Xóa thành công!")    
    await deleteProxy(id)
    setIsReload(!isReload)
  }
  
  const columns = useMemo<MRT_ColumnDef<IProxy>[]>(
    () => [
      {
        header: 'Value',
        accessorKey: 'proxyAddress',
        Cell: (props) => {
          const value = props.row.original.proxyAddress
          
          return value && value.length > 50 ? `${(value??"").slice(0, 50)}...` : value??"Trống"
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: proxies??[],
    ...optionsReactTableDefault,
    enableBottomToolbar: true,
    initialState: {
      ...optionsReactTableDefault.initialState,
    },
    state: {
       isLoading: proxies ? false : true
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
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
  });

  return (
    <Stack gap="1rem">
      <MaterialReactTable table={table} />
      {isModalAddOpen && (
        <ModalAddProxies
          setIsModalOpen={setIsModalAddOpen}
          isModalOpen={isModalAddOpen}
          isReload={isReload}
          setIsReload={setIsReload}
        />
      )}
    </Stack>
  );
}

export default Proxy