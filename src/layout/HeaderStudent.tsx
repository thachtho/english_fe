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
      className="site-layout-sub-header-background border-b-2 border-meta-3 border-opacity-20"
      style={{ background: 'white' }}
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
