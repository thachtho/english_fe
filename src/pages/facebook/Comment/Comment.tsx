import {
  Box,
  Stack
} from '@mui/material';
import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { getComments, IGetCommentParams } from '../../../api/comment.api';
import { useApp } from "../../../common/context/app.context";
import { timeAgo } from '../../../common/utils/time';
import Pagination from '../../../components/Pagination/Pagination';
import { IComment } from '../../../shared/interfaces/comment';

function Comment() {
  const [form] = Form.useForm<IGetCommentParams>()
  const initialValues: IGetCommentParams = {
    startDate: dayjs(),
    endDate: dayjs(),
    keyword: ""
  }
  const { optionsReactTableDefault } = useApp();
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(50)
  const [totalCount, setTotalCount] = useState<number>(0)

  useEffect(() => {
    (async () => {
      await callApi(initialValues)
    })()
  }, [page, pageSize])
  
  const columns = useMemo<MRT_ColumnDef<IComment>[]>(
    () => [
      {
        header: 'Thời gian',
        accessorKey: 'timeCreated',
        size: 300,
        Cell: (props) => {
          const timeCreated = String(props.row.original.timeCreated ?? "")
          
          return `${timeCreated} (${timeAgo(timeCreated)})`
        }
      },

      {
        header: 'Message',
        accessorKey: 'message',
        size: 400,
      },
      {
        header: 'Phone',
        accessorKey: 'phoneNumber',
        size: 100,
      },
      {
        header: 'Nguồn',
        accessorKey: 'link.linkName',
        size: 400,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: comments??[],
    ...optionsReactTableDefault,
    enableBottomToolbar: true,
    initialState: {
      ...optionsReactTableDefault.initialState,
      showGlobalFilter: false,
    },
    state: {
       isLoading: comments ? false : true
    },
    renderTopToolbarCustomActions: () => (
      <div className='flex'>
          <Form
            form={form}
            onFinish={onFinish}
            name='horizontal_login'
            layout='inline'
            className='white-label white-form'
            initialValues={{
              startDate: initialValues.startDate,
              endDate: initialValues.endDate,
              keyword: initialValues.keyword
            }}
          >
            <Form.Item
              label='Từ ngày'
              name='startDate'
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label='Đến ngày'
              name='endDate'
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Keyword"
              name="keyword"
            >
              <Input />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type='primary'
                htmlType='submit'
              >
                Search
              </Button>
            </Form.Item>
          </Form>
      </div>

    ),
    renderRowActions: (props) => {
      const phone = props.row.original.phoneNumber

      return (<Box sx={{ display: 'flex', gap: '1rem' }}>
          <Button type='primary'>Xem</Button>
          <Button className="text-primary" disabled={phone ? false : true}>
            Nhắn Zalo
          </Button>
          <Button className="text-primary">
            Nhắn FB
          </Button>
        </Box>);
    },
    renderBottomToolbar: () => (
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          totalCount={totalCount}
          pageSizeOptions={['50', "100", "200"]}
          setData={setComments}
        />
      </Box>
    ),
  });

  const onFinish = async () => {
    setComments(null)
    return callApi(form.getFieldsValue())
  }

  const callApi = async (values: any) => {
    const { data } = await getComments({ ...values, limit: pageSize, offset: pageSize * (page ? page - 1 : 0)   })
    setComments(data.data)
    setTotalCount(data.totalCount)
  }

  return (
    <Stack gap="1rem">
      <MaterialReactTable table={table}/>

    </Stack>
  );
}

export default Comment