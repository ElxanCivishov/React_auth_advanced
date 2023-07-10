import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { Layout } from "./components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
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
          <Route
            path="/changePassword"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
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
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/users"
            element={
              <Layout>
                <UserList />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
