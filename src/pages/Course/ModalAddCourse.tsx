import { DatePicker, DatePickerProps, Modal, Space } from 'antd'
import { useState } from 'react';

interface IPropsType {
    setIsModalOpen: (isOpen: boolean) => void,
    isModalOpen: boolean,
}

function ModalAddCourse({
    isModalOpen,
    setIsModalOpen
}: IPropsType) {
    const [from, setFrom] = useState<number | null>(null)
    const [to, setTo] = useState<number | null>(null)

    const handleOk = () => {
        console.log('From::', from);
        console.log('To::', to);

    }

    const onChangeFrom: DatePickerProps['onChange'] = (date, dateString) => {
        setFrom(Number(dateString));
    };

    const onChangeTo: DatePickerProps['onChange'] = (date, dateString) => {
        setTo(Number(dateString));
    };

    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
            <Space direction="vertical" className='flex flex-row justify-between'>
                <div>
                    <label>From:</label>
                    <DatePicker onChange={onChangeFrom} picker="year" />                    
                </div>
                <div>
                    <label>To:</label>
                    <DatePicker onChange={onChangeTo} picker="year" />
                </div>
            </Space>  
        </Modal>
    )
}

export default ModalAddCourse
