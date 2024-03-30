import toast from 'react-hot-toast';

interface IFetchDataProps {
    api: Function,
    setState: Function,
    params: any
}

function useFetchData({
    api,
    setState,
    params
}: IFetchDataProps) {
    const fetch = async () => {
        try {
          const { data } = await api(params);
          setState(data)

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
