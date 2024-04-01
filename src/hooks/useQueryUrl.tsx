import { useLocation } from 'react-router-dom';

const useQueryUrl = (query: string) => {
  // Get the location object using useLocation hook
  const location = useLocation();

  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);

  // Get the value of the 'course' parameter
  const course = queryParams.get(query);

  return course
};

export default useQueryUrl;
