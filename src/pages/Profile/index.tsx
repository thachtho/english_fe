import KeepAliveCustom from '../../components/KeepAliveCustom'
import Profile from './Profile'

function index() {
  return (
    <KeepAliveCustom>
      <Profile />
    </KeepAliveCustom>
  )
}

export default index
