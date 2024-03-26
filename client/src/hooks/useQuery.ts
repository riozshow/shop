import { useLocation } from 'react-router-dom';

function useQuery(param: string) {
  const location = useLocation();
  return new URLSearchParams(location.search).get(param);
}

export default useQuery;
