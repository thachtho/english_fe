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
  const isCheck = data.length > 0 && !loading
  const backgorund = isCheck ? 'rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1' : ''
  const overflow = isCheck ? 'max-w-full overflow-x-auto' : ''
  return (
    <div className="flex flex-col gap-10 mt-2">
      <div className={backgorund}>
        <div className={overflow}>
          {loading ? <Loader /> : (data.length === 0 ? <Empty description={message}/> :  children)}
        </div>
      </div>
  </div>
  )
}

export default BaseLayoutContent