import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";

import { Layout } from "./components";
import {
  ChangePassword,
  Forgot,
  Home,
  Login,
  LoginWithCode,
  Profile,
  Register,
  Reset,
  UserList,
  Verify,
} from "./containers";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/resetPassword/:resetToken" element={<Reset />} />
            <Route path="/loginWithCode/:email" element={<LoginWithCode />} />

            <Route
              path="/verify/:verificationToken"
              element={
                <Layout>
                  <Verify />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path="/changePassword"
              element={
                <Layout>
                  <ChangePassword />
                </Layout>
              }
            />
            <Route
              path="/users"
              element={
                <Layout>
                  <UserList />
                </Layout>
              }
            />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
