import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useNavigatePermissonDenied() {
  const navigation = useNavigate();

  const navigationPermissonDenied = () => {
    toast.error('Bạn không có quyền');
    navigation('/');
  };

  return {
    navigationPermissonDenied,
  };
}

export default useNavigatePermissonDenied;
