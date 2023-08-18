import React, { useState } from "react";
import "./changePassword.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Card,
  Loader,
  PageMenu,
  PasswordInput,
  useRedirectLoggedOutUser,
} from "../../components";
import {
  changePassword,
  logout,
  RESET,
} from "../../redux/features/auth/authSlice";
import { sendAutomatedEmail } from "../../redux/features/email/emailSlice";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  useRedirectLoggedOutUser("/login");
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const { isLoading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !password2) {
      return toast.error("All fields are required");
    }

    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: "Password Changed - AUTH React",
      send_to: user.email,
      reply_to: "elxan@gmail.com",
      template: "changePassword",
      url: "/forgot",
    };

    dispatch(changePassword(userData));
    dispatch(sendAutomatedEmail(emailData));
    dispatch(logout());
    dispatch(RESET(userData));
    navigate("/login");
  };

  return (
    <>
      <section>
        <div className="container">
          <PageMenu />
          <h2>Change Password</h2>
          <div className="--flex-start change-password">
            <Card cardClass={"card"}>
              <>
                <form onSubmit={updatePassword}>
                  <p>
                    <label>Current Password</label>
                    <PasswordInput
                      placeholder="Old Password"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>New Password:</label>
                    <PasswordInput
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>confirm New Password:</label>
                    <PasswordInput
                      placeholder="Confirm Password"
                      name="password2"
                      value={password2}
                      onChange={handleInputChange}
                    />
                  </p>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button
                      type="submit"
                      className="--btn --btn-danger --btn-block"
                    >
                      Change Password
                    </button>
                  )}
                </form>
              </>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
