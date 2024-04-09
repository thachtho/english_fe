import KeepAliveCustom from '../../components/KeepAliveCustom'
import Home from './Home'

function index() {
  return (
    <KeepAliveCustom>
      <Home />
    </KeepAliveCustom>
  )
}

export default index
