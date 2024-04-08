import { useEffect } from "react"
import useAddTab from "../hooks/useAddTab"
import { getMenuControls } from "../api/control.api"

function Home() {
    useAddTab()

    useEffect(() => {
        ( async () => {
            const { data } = await getMenuControls()
            console.log(123123, data)
        }) ()
    }, [])

  return (
    <div>
      <input />
    </div>
  )
}

export default Home
