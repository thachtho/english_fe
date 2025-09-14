
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ConfigProvider, PaginationProps, Pagination as Pg } from 'antd';

export interface IPagination {
    setPage: (page: number) => void
    setPageSize: (pageSize: number) => void
    totalCount: number
    pageSize: number
    pageSizeOptions: string[]
    setData: (data: any[] | null) => void
}

function Pagination({pageSize, setPage, setPageSize, totalCount, pageSizeOptions, setData}: IPagination) {
    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
        return <a style={{ color: "black" }}>Previous</a>;
        }
        if (type === 'jump-prev') {
        return (
            <a>
                <LeftOutlined style={{ color: "black" }}/> 
            </a>
        )
        }
        if (type === 'jump-next') {
        return (
            <a>
                <RightOutlined style={{ color: "black" }}/> 
            </a>
        )
        }
        if (type === 'next') {
        return <a style={{ color: "black" }}>Next</a>;
        }
        return originalElement;
    };
    
    const onChangePagination = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
        setData(null)
    } 
    
    return (
        <div style={{ float: "right" }}>
            <ConfigProvider
                theme={{
                components: {
                    Pagination: {
                        colorTextDisabled: "red",
                    },
                },
                }}
            >
            <Pg showSizeChanger={true} pageSizeOptions={pageSizeOptions} onChange={onChangePagination} total={totalCount} itemRender={itemRender} pageSize={pageSize}  showTotal={(total) => <span>Total {total} items</span>}/>
                
            </ConfigProvider>
        </div>
    )
}

export default Pagination