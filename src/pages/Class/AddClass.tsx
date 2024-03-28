import { Modal } from 'antd';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { creatClass } from '../../api/class.api';
import useValidator from '../../hooks/validator';

interface IAddClass {
    setIsModalOpen: (isShow: boolean) => void,
    isModalOpen: boolean,
    getDataClass: () => void
}

interface IAdd {
    className: string
}

const AddClass = ({ setIsModalOpen, isModalOpen, getDataClass }: IAddClass) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IAdd>();
    const { validator } = useValidator()

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit: SubmitHandler<IAdd> = async (data) => {
        try {
            await creatClass({ name: data.className })
            setIsModalOpen(false);
            getDataClass();
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            setValue('className', '', { shouldDirty: true })
        }
    }, [isModalOpen]) 

    return (
        <>
        <Modal title="Thêm" open={isModalOpen} onOk={handleSubmit(onSubmit)} onCancel={handleCancel}>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                    Tên học sinh
                    </label>
                    <input 
                        {...register("className", { required: true, maxLength: 50, minLength: 1 })}
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                {errors.className ? validator(errors) : ''}
                </div>
            </div>
        </Modal>
        </>
    );
};

export default AddClass;