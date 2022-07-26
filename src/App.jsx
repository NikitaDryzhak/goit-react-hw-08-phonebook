import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppBar from './components/AppBar';
import Loader from './components/Loader';
import { PublicRoute, PrivateRoute, CustomRoute } from 'components/CustomRoute';

import { useGetCurrentUserMutation } from 'redux/services';
import { getToken } from 'redux/selectors';

const Home = lazy(() => import('pages/Home'));
const SignUp = lazy(() => import('pages/SignUp'));
const LogIn = lazy(() => import('pages/LogIn'));
const Contacts = lazy(() => import('pages/Contacts'));

export default function App() {
  const [content, setContent] = useState(false);
  const token = useSelector(getToken);

  const [fetchCurrentUser, { isSuccess, isError }] = useGetCurrentUserMutation({
    skip: token,
  });

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    } else {
      toggleContent();
    }
  }, [fetchCurrentUser, token]);

  const toggleContent = () => {
    setContent(state => !state);
  };

  return (
    (content || isSuccess || isError) && (
      <>
        <AppBar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />

            <Route
              path="signUp"
              element={
                <PublicRoute restricted>
                  <SignUp />
                </PublicRoute>
              }
            />

            <Route
              path="logIn"
              element={
                <PublicRoute restricted>
                  <LogIn />
                </PublicRoute>
              }
            />

            <Route
              path="contacts"
              element={
                <PrivateRoute restricted>
                  <Contacts />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<CustomRoute restricted />} />
          </Routes>
        </Suspense>
      </>
    )
  );
}
