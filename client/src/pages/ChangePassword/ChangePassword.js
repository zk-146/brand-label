import "./ChangePassword.css";

import Button from "../../Components/Button/Button";
import InputText from "../../Components/Input/InputText";
import axios from "../../axios";
import { parseCookies } from "nookies";
import { useState } from "react";

const ChangePassword = () => {
  const { token } = parseCookies();
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");

  const [passwordChanged, setPasswordChanged] = useState(0);

  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  const sendPassword = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.patch(
        "/user/profile/changepassword/",
        {
          userId: user._id,
          password,
          newPassword,
        },
        {
          headers: headers,
        }
      );
      setPasswordChanged(res.status);
      setPassword("");
      setNewPassword("");
      setconfirmNewPassword("");
    } catch (err) {
      setPasswordChanged(400);
      console.log(err);
    }
  };

  return (
    <div className="changePass">
      <div className="changePass__container">
        <div className="header">Change Password</div>
        <InputText
          customClass="password form__input"
          value={password}
          setValue={setPassword}
          password
          placeholder="Enter your current password"
        />
        <InputText
          customClass="password form__input"
          value={newPassword}
          setValue={setNewPassword}
          password
          placeholder="Enter new password"
        />
        <InputText
          customClass="password form__input"
          value={confirmNewPassword}
          setValue={setconfirmNewPassword}
          password
          placeholder="Confirm new password"
        />
        {passwordChanged === 200 ? (
          <p className="changePass__success"> Password Changed Successfully</p>
        ) : passwordChanged !== 200 && passwordChanged !== 0 ? (
          <p className="changePass__fail">Invalid Password</p>
        ) : (
          <p></p>
        )}
        <Button
          value="Save Password"
          customClass="profile__btn"
          handleClick={sendPassword}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
