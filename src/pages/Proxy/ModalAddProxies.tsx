import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";
import { customErrorToast } from "../../common/utils/toast";
import { createTokens } from "../../api/token.api";
import { ETokenHandleType } from "../../shared/interfaces/token";
import { createProxies } from "../../api/proxy.api";

interface IPropsAddProxies {
    setIsModalOpen: (open: boolean) => void;
    isModalOpen: boolean;
    isReload: boolean;
    setIsReload: (isReload: boolean) => void;
}

const ModalAddProxies = ({ setIsModalOpen, isModalOpen,isReload, setIsReload }: IPropsAddProxies): JSX.Element => {
    const [proxies, setProxies] = useState<string>('')

    const handleAddproxies = async () => {
        if (proxies.length === 0) {
            toast.error('Nội dung không được trống!')
            return
        }
        if (proxies.length === 0) {
        toast.error('Nội dung không được trống!')
        return
        }
        const proxiesValid = proxies
        .split('\n')
        .map((proxie) => proxie.trim())
        .filter((proxie) => proxie.length > 0)
        .map((item) => {
            return item
        })

        try {
            setIsModalOpen(false)        
            setProxies('')
            const response = await createProxies({ proxies: proxiesValid })
            setIsReload(!isReload)
            toast((response.data as any).message)            
        } catch (error) {
            customErrorToast(error)
        }
    }

    const handleOk = () => {
        return handleAddproxies()
    }
    
    return (
        <Modal
            title="Add tokens"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={() => handleOk()}
            onCancel={() => setIsModalOpen(false)}
        >
            <TextArea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setProxies(e.target.value)
                }} rows={4} />
        </Modal>
    );
};

export default ModalAddProxies;