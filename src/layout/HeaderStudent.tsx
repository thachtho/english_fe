import { Header } from 'antd/es/layout/layout';
import './header-student.scss';
import { useNavigate } from 'react-router-dom';
import LogOut from '../components/Icon/LogOut';
import { useTabs } from '../context/tabs.context';

function HeaderStudent() {
  const navigation = useNavigate();
  const { setItems } = useTabs();

  const handleLogout = () => {
    setItems([]);
    localStorage.clear();
    navigation('/auth/signin');
  };
  return (
    <Header
      className="site-layout-sub-header-background"
      style={{ background: '#5ac8fa' }}
    >
      <div className="header flex justify-center items-center">
        <button onClick={() => handleLogout()} className="logout">
          <LogOut />
        </button>
        <span className="username">Thobui</span>
      </div>
    </Header>
  );
}

export default HeaderStudent;
