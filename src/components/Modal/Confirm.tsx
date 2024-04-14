import { Modal } from "antd"

interface IPropsModalConfirm {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    handle: () => Promise<void> | void,
    message: string
}
function ModalConfirm({ 
    isOpen,
    setIsOpen,
    handle,
    message
}: IPropsModalConfirm) {
    const handleOk = async () => {
        await handle();
        setIsOpen(false)
    }
    
  return (
    <Modal title="Thông báo" open={isOpen} onOk={() => handleOk()} onCancel={() => setIsOpen(false)}>
        {message}
    </Modal>
  )
}

export default ModalConfirm
