import { DatePicker, DatePickerProps, Space } from 'antd';
import HeaderAddElementComponent from '../../components/HeaderAddElementComponent';
import useTitle from '../../hooks/useTitle';
import { useState } from 'react';
import ModalAddCourse from './ModalAddCourse';

function Course() {
    useTitle();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdd = () => {
        setIsModalOpen(true)
    }
    
    return (
        <>
            <HeaderAddElementComponent 
                handleAdd={handleAdd}
                isButtonImportExcell={false}
            />   
            {isModalOpen &&
                <ModalAddCourse
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            } 
        </>

        // <BaseLayoutContent>
        //   <div className='student'>
        //     <TableList table={table}/>
        //     <div className="h-2" />
        //     <Panigation table={table} />                
        //   </div>
        // </BaseLayoutContent>
    )
}

export default Course
