import { ReactNode } from "react"

function BaseLayoutContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-10 mt-2">
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {children}
      </div>
    </div>
  </div>
  )
}

export default BaseLayoutContent
