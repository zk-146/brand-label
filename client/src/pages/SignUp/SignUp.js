import "./SignUp.css";

import { Link, useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Dropdown from "react-dropdown";
import InputText from "../../Components/Input/InputText";
import IsEmail from "isemail";
import PhoneInput from "react-phone-number-input";
import axios from "../../axios";
import { useStateValue } from "../../Components/GlobalContext/StateProvider";

function SignUp() {
  const firstRender = useRef(true);
  const [, dispatch] = useStateValue();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const options = ["Male", "Female", "Other"];
  const [firstNameErr, setFirstNameErr] = useState({});
  const [lastNameErr, setLastNameErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [confirmPasswordErr, setConfirmPasswordErr] = useState({});
  const [mobileErr, setMobileErr] = useState({});
  const [genderErr, setGenderErr] = useState({});

  const [resError, setResError] = useState("");

  const [submit, setSubmit] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const validateInputs = () => {
      const firstNameErr = {};
      const lastNameErr = {};
      const emailErr = {};
      const passwordErr = {};
      const confirmPasswordErr = {};
      const mobileErr = {};
      const genderErr = {};
      let isInvalid = false;

      const options = ["Male", "Female", "Other"];

      if (firstName === "") {
        firstNameErr.fieldRequired = "This field is required";
      }

      if (lastName === "") {
        lastNameErr.fieldRequired = "This field is required";
      }

      if (email === "") {
        emailErr.fieldRequired = "This field is required";
        isInvalid = true;
      }
      if (password === "") {
        passwordErr.fieldRequired = "This field is required";
        isInvalid = true;
      }
      if (confirmPassword === "") {
        confirmPasswordErr.fieldRequired = "This field is required";
        isInvalid = true;
      }
      if (mobile === "") {
        mobileErr.fieldRequired = "This field is required";
        isInvalid = true;
      }
      if (gender === "") {
        genderErr.fieldRequired = "This field is required";
        isInvalid = true;
      }

      if (!IsEmail.validate(email)) {
        if (!emailErr.fieldRequired)
          emailErr.invalidEmail = "Please enter a valid email";
        isInvalid = true;
      }

      if (!passwordErr.fieldRequired) {
        if (password.length < 6) {
          passwordErr.tooShort = "Password is too short";
        }
        isInvalid = true;
      }

      if (
        !confirmPasswordErr.fieldRequired &&
        !confirmPasswordErr.fieldRequired
      ) {
        if (!passwordErr.tooShort) {
          if (password !== confirmPassword) {
            confirmPasswordErr.dontmatch = "Passwords dont match";
          }
        }
        isInvalid = true;
      }

      if (mobile.trim().length < 13) {
        if (!mobileErr.fieldRequired)
          mobileErr.invalidMobile = "Please enter a 10 digit mobile number";
        isInvalid = true;
      }

      if (!genderErr.fieldRequired) {
        if (!options.includes(gender)) {
          genderErr.invalidGender = "Please select an option from dropdown";
        }
        isInvalid = true;
      }

      setFirstNameErr(firstNameErr);
      setLastNameErr(lastNameErr);
      setEmailErr(emailErr);
      setPasswordErr(passwordErr);
      setConfirmPasswordErr(confirmPasswordErr);
      setMobileErr(mobileErr);
      setGenderErr(genderErr);
      console.log(firstNameErr);
      console.log(submit);
      return isInvalid;
    };
    if (submit) {
      setDisabled(validateInputs());
      setSubmit(false);
    }
  }, [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    mobile,
    gender,
    submit,
  ]);

  const changeMobile = (event) => {
    try {
      if (event.length <= 13) {
        setMobile(event);
      } else {
        setMobile("");
      }
    } catch (err) {}
  };

  const userSignup = async (event) => {
    event.preventDefault();
    if (disabled) {
      try {
        const res = await axios.post(`/signup`, {
          method: "POST",
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          mobile,
          gender,
        });
        console.log(res.data);
        dispatch({
          type: "SET_USER",
          user: res.data,
        });
        history.push("/login");
      } catch (err) {
        console.log(err.response.data.error);
        setResError(err.response.data.error);
      }
    }
  };

  return (
    <div className="signUp">
      <div className="signUp__container">
        <div className="header signUp__header">Sign Up</div>
        <form className="form">
          <div className="signUp__firstName">
            {Object.keys(firstNameErr).map((key, index) => {
              return (
                <div className="input__error" key={index}>
                  {firstNameErr[key]}
                </div>
              );
            })}
            <InputText
              customClass="firstname"
              placeholder="First Name"
              value={firstName}
              setValue={setFirstName}
            />
          </div>
          <div className="signUp__lastName">
            {Object.keys(lastNameErr).map((key, index) => {
              return (
                <div className="input__error" key={index}>
                  {lastNameErr[key]}
                </div>
              );
            })}
            <InputText
              customClass="lastname"
              placeholder="Last Name"
              value={lastName}
              setValue={setLastName}
            />
          </div>
          <div className="signUp__email">
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
          <div className="signUp__password">
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
          </div>
          <div className="signUp__confirmPassowrd">
            {Object.keys(confirmPasswordErr).map((key, index) => {
              return (
                <div className="input__error" key={index}>
                  {confirmPasswordErr[key]}
                </div>
              );
            })}
            <InputText
              customClass="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              setValue={setConfirmPassword}
              password
            />
          </div>
          <div className="signUp__mobile">
            {Object.keys(mobileErr).map((key, index) => {
              return (
                <div className="input__error" key={index}>
                  {mobileErr[key]}
                </div>
              );
            })}
            <PhoneInput
              international={true}
              defaultCountry="IN"
              countryCallingCodeEditable={false}
              value={mobile}
              onChange={(event) => {
                changeMobile(event);
              }}
              countrySelectComponent="disabled"
              autoComplete="tel"
              limitMaxLength={true}
            />
          </div>
          <div className="signUp__gender">
            {Object.keys(genderErr).map((key, index) => {
              return (
                <div className="input__error" key={index}>
                  {genderErr[key]}
                </div>
              );
            })}
            <Dropdown
              className="dropdown__menu"
              options={options}
              value={gender}
              placeholder="Select a gender..."
              onChange={(event) => {
                setGender(event.value);
              }}
            />
          </div>
        </form>

        {resError !== "" && <p className="input__error">{resError}</p>}

        <input
          className="btn login__btn"
          value="Sign Up"
          type="button"
          onClick={(event) => {
            // onSubmit={(event) => {
            setSubmit(true);
            userSignup(event);
            // }}
          }}
        />

        <Link className="link" to="/login">
          <p className="new">
            Already a user? <b>Login</b>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
