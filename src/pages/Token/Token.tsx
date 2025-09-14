import {
  Box,
  IconButton,
  Stack,
  Tooltip
} from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { deleteToken, getTokens } from '../../api/token.api';
import { useApp } from '../../common/context/app.context';
import { DeleteIcon } from '../../components';
import { IToken } from '../../shared/interfaces/token';
import ModalAddTokens from './ModalAddTokens';
import { Button } from 'antd';
import { toast } from 'react-toastify';

function Token() {
  const { optionsReactTableDefault } = useApp();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [tokens, setTokens] = useState<IToken[] | null>(null);
  const [isReload, setIsReload] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const res = await getTokens()
      setTokens(res.data)

    })()
  }, [isReload])

  const handleDelele = async (id: number) => {
    toast("Xóa thành công!")    
    await deleteToken(id)
    setIsReload(!isReload)
  }
  
  const columns = useMemo<MRT_ColumnDef<IToken>[]>(
    () => [
      {
        header: 'Value',
        accessorKey: 'tokenValue',
        Cell: (props) => {
          const value = props.row.original.tokenValue
          
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
    data: tokens??[],
    ...optionsReactTableDefault,
    enableBottomToolbar: true,
    initialState: {
      ...optionsReactTableDefault.initialState,
    },
    state: {
       isLoading: tokens ? false : true
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
        <ModalAddTokens
          setIsModalOpen={setIsModalAddOpen}
          isModalOpen={isModalAddOpen}
          isReload={isReload}
          setIsReload={setIsReload}
        />
      )}
    </Stack>
  );
}

export default Token