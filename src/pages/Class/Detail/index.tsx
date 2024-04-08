import useAddTab from "../../../hooks/useAddTab"
import DetailClass from "./DetailClass"

function index() {
  useAddTab()
  return (
    <DetailClass />
  )
}

export default index
