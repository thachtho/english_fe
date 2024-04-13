import { Modal } from 'antd';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Dropdown from '../../components/Dropdown';
import useValidator from '../../hooks/validator';
import { BLOCKS } from '../../shared/constants';

interface IPropsModal {
    setIsModalOpen: (isShow: boolean) => void,
    isModalOpen: boolean,
    getDataClass: () => void,
    handle: ({ name, teacherId }: { name: string, teacherId: number, blockId: number }) => Promise<AxiosResponse<IClass, any>>,
    options?: {
        className?: string,
        teacherId?: number,
        blockId?: number
    },
    isEdit?: boolean,
    teachers: IUser[],
    dataTeachersDropdown: IPropsDropdown[],
    title: string
}

interface IHanlde {
    className: string,
}

const ModalClass = ({ 
    setIsModalOpen, 
    isModalOpen, 
    getDataClass,
    handle,
    options,
    isEdit = false,
    dataTeachersDropdown,
    title
}: IPropsModal) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IHanlde>();
    const { validator } = useValidator()
    const [userSlected, setUserSelected] = useState(() => {
        return options?.teacherId??null
    });
    const [blockSlected, setBlockSelected] = useState<null | number>(() => {
        return options?.blockId??null
    });
    const [messageError, setMessageError] = useState('')

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit: SubmitHandler<IHanlde> = async (data) => {
        if (userSlected === 0 || userSlected === null) {
            setMessageError('Giáo viên không được để trống!')

            return;
        }

        if (blockSlected === 0 || blockSlected === null) {
            setMessageError('Khối không được để trống!')

            return;
        }
        try {
            await handle({ name: data.className.trim(), teacherId: Number(userSlected), blockId: blockSlected })
            setIsModalOpen(false);
            getDataClass();
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            setValue('className', options?.className ?? '', { shouldDirty: true })
        }
    }, [isModalOpen]) 

    const handleChangeTeacher = (value: number) => {
        setMessageError('');
        setUserSelected(value)
    }

    const handleChangeBlock = (value: number) => {
        setMessageError('');
        setBlockSelected(value)
    }

    return (
        <>
            <Modal title={title} open={isModalOpen} onOk={handleSubmit(onSubmit)} onCancel={handleCancel}>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                            Tên lớp
                            </label>
                            <input 
                                {...register("className", { required: true, maxLength: 50, minLength: 1 })}
                                type="text"
                
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        {errors.className ? validator(errors) : ''}
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Giáo viên
                            </label>
                            <div className="relative z-20 bg-transparent dark:bg-form-input">
                                {((isEdit && options?.teacherId ) || (!isEdit)) &&
                                    <Dropdown 
                                        data={dataTeachersDropdown} 
                                        handleChange={handleChangeTeacher} 
                                        defaultValue={options?.teacherId ? String(options?.teacherId) : ''}
                                    />
                                }
                            </div>
                        </div>
                        {messageError.length > 0 && <span className="text-meta-1"><i>{messageError}</i></span>}
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Khối
                            </label>
                            <div className="relative z-20 bg-transparent dark:bg-form-input">
                                {((isEdit && blockSlected ) || (!isEdit)) &&
                                    <Dropdown 
                                        data={BLOCKS} 
                                        handleChange={handleChangeBlock} 
                                        defaultValue={ blockSlected ? String(blockSlected) : ''}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalClass;