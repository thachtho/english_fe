import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

import { toast } from "react-toastify";
import { updateLink } from "../../../api/link.api";
import { customErrorToast } from "../../../common/utils/toast";
import { ILink } from "../../../shared/interfaces/link";

interface IPropsEditLink {
    setIsModalOpen: (open: boolean) => void;
    isModalOpen: boolean;
    isReload: boolean;
    setIsReload: (isReload: boolean) => void;
    link: ILink
}

const ModalEditLink = ({ setIsModalOpen, isModalOpen, isReload, setIsReload, link }: IPropsEditLink): JSX.Element => {
    const handleEditLink = async () => {
        if (link.linkUrl.length === 0) {
            toast.error('Nội dung không được trống!')
            return
        }

        try {
            setIsModalOpen(false)
            setIsReload(!isReload)
            toast("Update thành công!")   
            await updateLink(link)         
        } catch (error) {
            customErrorToast(error)
        }
    }

    const handleOk = () => {
        return handleEditLink()
    }
    
    return (
        <Modal
            title="Edit link"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={() => handleOk()}
            onCancel={() => setIsModalOpen(false)}
        >
            <TextArea
                aria-label="Url"
                defaultValue={link.linkUrl}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    link.linkUrl = e.target.value
                }} rows={4} />
        </Modal>
    );
};

export default ModalEditLink;