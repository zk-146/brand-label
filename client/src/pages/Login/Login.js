import "./Login.css";

import { Link, useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Button from "../../Components/Button/Button";
import InputText from "../../Components/Input/InputText";
import axios from "../../axios";
import isEmail from "isemail";
import { parseCookies } from "nookies";
import { useStateValue } from "../../Components/GlobalContext/StateProvider";

const Login = () => {
  const firstRender = useRef(true);
  const [, dispatch] = useStateValue();

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [submit, setSubmit] = useState(false);
  const [submitErr, setSubmitErr] = useState("");

  // const [disabled, setDisabled] = useState(true);
  const [, setDisabled] = useState(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const validateInputs = () => {
      const emailErr = {};
      const passwordErr = {};
      let isInvalid = false;
      if (email === "") {
        emailErr.fieldRequired = "This field is required";
        isInvalid = true;
      }
      if (password === "") {
        passwordErr.fieldRequired = "This field is required";
        isInvalid = true;
      }
      if (!isEmail.validate(email)) {
        if (!emailErr.fieldRequired)
          emailErr.invalidEmail = "Please enter a valid email";
        isInvalid = true;
      }
      setEmailErr(emailErr);
      setPasswordErr(passwordErr);
      return isInvalid;
    };

    if (submit) {
      setDisabled(validateInputs());
      // setSubmit(false);
    }
  }, [email, password, submit]);

  const userLogin = async (event) => {
    event.preventDefault();

    // if (!disabled) {
    try {
      const res = await axios.post("/login", {
        method: "POST",
        email,
        password,
        withCredentials: true,
      });
      if (res.error) {
        console.log(res.error);
      } else {
        const cookie1 = parseCookies();
        const user = cookie1.user ? JSON.parse(cookie1.user) : "";
        const isAuth = cookie1.isAuth ? JSON.parse(cookie1.isAuth) : "";
        dispatch({
          type: "SET_USER",
          user: user,
          isAuth: isAuth,
        });
        console.log();
        history.push("/");
      }
    } catch (err) {
      // const submitErr = {};
      // submitErr.loginFailed = err.response.data;
      setSubmitErr(err.response.data.error);
    }
    // }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="header login__header">Login</div>
        <form className="form">
          <div className="login__email">
            {Object.keys(emailErr).map((key, index) => {
              return (
                <div className="input__error" key={index}>
                  {emailErr[key]}
                </div>
              );
            })}
            <InputText
              customClass="email"
              placeholder="Email"
              value={email}
              setValue={setEmail}
              email
            />
          </div>

          <div className="login__password">
            {Object.keys(passwordErr).map((key, index) => {
              return (
                <div className="input__error" key={index}>
                  {passwordErr[key]}
                </div>
              );
            })}
            <InputText
              customClass="password"
              placeholder="Password"
              value={password}
              setValue={setPassword}
              password
            />
            <Link className="link" to="/forgotpassword">
              <p className="login__forgotPassoword">Forgot Password?</p>
            </Link>
          </div>
        </form>
        {submitErr !== "" ? (
          <div className="input__error">{submitErr}</div>
        ) : (
          <div></div>
        )}
        <Button
          customClass="login__btn"
          value="Login"
          handleClick={(event) => {
            setSubmit(true);
            userLogin(event);
          }}
        />
        <Link className="link" to="/signup">
          <p className="new">
            New user? <b>Create a new account</b>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
