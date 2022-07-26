import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn } from 'redux/selectors';

export function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return <>{isLoggedIn ? children : <Navigate to={'login'} />}</>;
}

export function PublicRoute({ children, restricted = false }) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return <>{shouldRedirect ? <Navigate to={'login'} /> : children}</>;
}

export function CustomRoute() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return <>{isLoggedIn ? <Navigate to="/" /> : <Navigate to={'login'} />}</>;
}
