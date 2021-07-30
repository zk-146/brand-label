import "./ForgotPassword.css";

import Button from "../../Components/Button/Button";
import InputText from "../../Components/Input/InputText";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="forgotPassword">
      <div className="forgotPassword__container">
        <div className="header">Forgot Password</div>
        <form className="form">
          <div className="forgotPassword__instruction">
            <p className="">
              Enter the email address that you used to sign up. We'll send you
              an email with a link to reset your password.
            </p>
          </div>
          <div className="forgotPassword__email">
            <InputText
              value={email}
              setValue={setEmail}
              placeholder="Email"
              email
            />
          </div>
        </form>
        <Button
          value="Reset Password"
          customClass="login__btn"
          // handleClick={(e) => console.log(e)}
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
