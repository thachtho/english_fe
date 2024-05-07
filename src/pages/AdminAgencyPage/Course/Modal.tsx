import { DatePicker, Modal, Space } from 'antd'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

interface IProps {
    isModalOpen: boolean, 
    setIsModalOpen: (isModalOpen: boolean) => void,
    handleOk: () => void,
    onChangeFrom: (a: any, b: any) => void,
    onChangeTo: (a: any, b: any) => void,
    from?: number | null,
    to?: number | null
}

function ModalCourse({
    handleOk, 
    isModalOpen,
    onChangeFrom,
    onChangeTo,
    setIsModalOpen,
    from = null,
    to = null
}: IProps) {
    const dateFormat = 'YYYY';

    return (
        <Modal title="Khóa học" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
            <Space direction="vertical" className='flex flex-row justify-between'>
                <div>
                    <label>From:</label>
                    <DatePicker onChange={onChangeFrom} picker="year"  defaultValue={dayjs(`'${from}'`, dateFormat)}/>                 
                </div>
                <div>
                    <label>To:</label>
                    <DatePicker onChange={onChangeTo} picker="year" defaultValue={dayjs(`'${to}'`, dateFormat)}/>
                </div>
            </Space>  
        </Modal>
    )
}

export default ModalCourse
