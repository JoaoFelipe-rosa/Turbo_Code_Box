import { useLocation } from 'react-router-dom';

export default function useIsHomePage() {
  const location = useLocation();
  return location.pathname === '/';
}
