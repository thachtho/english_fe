import KeepAliveCustom from "../../../components/KeepAliveCustom"
import useAddTab from "../../../hooks/useAddTab"
import DetailClass from "./DetailClass"

function index() {
  useAddTab()
  return (
    <KeepAliveCustom>
      <DetailClass />
    </KeepAliveCustom>
    
  )
}

export default index
