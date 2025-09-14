import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

import { createLink } from "../../../api/link.api";
import { customErrorToast } from "../../../common/utils/toast";
import { LinkStatus } from "../../../shared/interfaces/link";
import { toast } from "react-toastify";

interface IPropsAddLink {
    setIsModalOpen: (open: boolean) => void;
    isModalOpen: boolean;
    isReload: boolean;
    setIsReload: (isReload: boolean) => void;
}

const ModalAddLink = ({ setIsModalOpen, isModalOpen,isReload, setIsReload }: IPropsAddLink): JSX.Element => {
    const [link, setLink] = useState<string>('')

    const handleAddLink = async () => {
        if (link.length === 0) {
            toast.error('Nội dung không được trống!')
            return
        }
        const links = link
        .split('\n')
        .map((url) => url.trim())
        .filter((url) => url.length > 0)
        .map((item) => {
            const splitItem = item.split('|')
            return {
            url: splitItem[0],
            name: splitItem[1],
            delayTime: 1,
            }
        })

        const argCreate = {
            links,
            status: LinkStatus.Started,
            hideCmt: false,
            thread: 1,
            tablePageId: null
        }
        try {
            const response = await createLink(argCreate)
            setLink('')
            setIsModalOpen(false)
            setIsReload(!isReload)
            toast((response.data as any).message)            
        } catch (error) {
            customErrorToast(error)
        }
    }

    const handleOk = () => {
        return handleAddLink()
    }
    
    return (
        <Modal
            title="Add link"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={() => handleOk()}
            onCancel={() => setIsModalOpen(false)}
        >
            <TextArea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setLink(e.target.value)
                }} rows={4} />
        </Modal>
    );
};

export default ModalAddLink;