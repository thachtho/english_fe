import toast from 'react-hot-toast';

interface IFetchDataProps {
    api: Function,
    params: any
}

function useFetchData({
    api,
    params
}: IFetchDataProps) {
    const fetch = async () => {
        try {
          const { data } = await api(params);

          return data;
        } catch (error: any) {
          toast.error(error?.response?.data?.message)
        }
    }
  
    return {
        fetch
    }
}

export default useFetchData
