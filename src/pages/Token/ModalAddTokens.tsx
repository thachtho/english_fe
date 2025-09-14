import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";
import { customErrorToast } from "../../common/utils/toast";
import { createTokens } from "../../api/token.api";
import { ETokenHandleType } from "../../shared/interfaces/token";

interface IPropsAddToken {
    setIsModalOpen: (open: boolean) => void;
    isModalOpen: boolean;
    isReload: boolean;
    setIsReload: (isReload: boolean) => void;
}

const ModalAddTokens = ({ setIsModalOpen, isModalOpen,isReload, setIsReload }: IPropsAddToken): JSX.Element => {
    const [tokens, setTokens] = useState<string>('')

    const handleAddTokens = async () => {
        if (tokens.length === 0) {
            toast.error('Nội dung không được trống!')
            return
        }
        const tokensValid = tokens
        .split('\n')
        .map((token) => token.trim())
        .filter((token) => token.length > 0)
        .map((item) => {
            return item
        })

        try {
            const response = await createTokens({ tokens: tokensValid, type: ETokenHandleType.GET_INFO })
            setTokens('')
            setIsModalOpen(false)
            setIsReload(!isReload)
            toast((response.data as any).message)            
        } catch (error) {
            customErrorToast(error)
        }
    }

    const handleOk = () => {
        return handleAddTokens()
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
                    setTokens(e.target.value)
                }} rows={4} />
        </Modal>
    );
};

export default ModalAddTokens;