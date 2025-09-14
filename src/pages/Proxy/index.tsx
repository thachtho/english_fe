import KeepAliveCustom from '../../components/KeepAliveCustom'
import Proxy from './Proxy'

function index() {
  return (
    <KeepAliveCustom>
      <Proxy />
    </KeepAliveCustom>
  )
}

export default index
