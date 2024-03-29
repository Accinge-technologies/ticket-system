import React, { useEffect, useState } from 'react';

import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import AxiosInterceptor from '../../core/services/axios/response-interceptor';

export const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [authState, setAuthState] = useState(false)
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('frmAccessToken');
    setAuthState(isAuthenticated)
    if (!isAuthenticated) {
      const redirectUrl = location.pathname + location.search;
      navigate(`/auth/itclogin?redirect=${encodeURIComponent(redirectUrl)}`);
    }
  }, [location.pathname, location.search, navigate])


  return authState ? (
    <>
      <AxiosInterceptor />
      <Outlet />
    </>
  ) : null;

};
