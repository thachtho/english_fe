import { Modal } from 'antd';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { creatUser } from '../../../api/user/user.api';
import useValidator from '../../../hooks/validator';
import { ROLE } from '../../../shared/enums/role';

interface IAddTeacher {
    setIsModalOpen: (isShow: boolean) => void,
    isModalOpen: boolean,
    getDataTeacher: () => void
}

interface IAdd {
    fullname: string
}

const AddStudent = ({ setIsModalOpen, isModalOpen, getDataTeacher }: IAddTeacher) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IAdd>();
    const { validator } = useValidator()

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit: SubmitHandler<IAdd> = async (data) => {
        try {
            await creatUser({ ...data, role: ROLE.STUDENT })
            setIsModalOpen(false);
            getDataTeacher();
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            setValue('fullname', '', { shouldDirty: true })
        }
    }, [isModalOpen]) 

    return (
        <>
        <Modal title="Thêm" open={isModalOpen} onOk={handleSubmit(onSubmit)} onCancel={handleCancel}>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                    Tên giáo viên
                    </label>
                    <input 
                        {...register("fullname", { required: true, maxLength: 50, minLength: 3 })}
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                {errors.fullname ? validator(errors) : ''}
                </div>
            </div>
        </Modal>
        </>
    );
};

export default AddStudent;