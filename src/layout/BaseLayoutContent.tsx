import { ReactNode } from "react"
import Loader from "../common/Loader";
import { Empty } from "antd";

function BaseLayoutContent({ 
  loading,
  data,
  children,
  message
}: {
    loading: boolean,
    data: any[],
    children?: ReactNode;
    message: string
}) {

  return (
    <div className="flex flex-col gap-10 mt-2">
      {loading ? <Loader /> : (data.length === 0 ? <Empty description={message}/> :  children)}
    </div>
  )
}

export default BaseLayoutContent