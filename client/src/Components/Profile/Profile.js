import React, { useEffect, useState } from "react";
import "./Profile.css";
// import Dropdown from "react-dropdown";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import axios from "../../axios";
// import { useStateValue } from "../GlobalContext/StateProvider";
import { parseCookies } from "nookies";

function Profile() {
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  // const [{ user }] = useStateValue("");

  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  // const [gender, setGender] = useState("Male");
  const [mobile, setMobile] = useState(user.mobile);
  // const options = ["Male", "Female", "Other"];
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail] = useState(false);
  const [editMobile] = useState(false);
  const [editGender] = useState(false);

  useEffect(() => {
    const { token } = parseCookies();
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const fetchProfileDetails = async () => {
      const res = await axios.post(
        "/user/profile",
        {
          userId: user._id,
        },
        {
          headers: headers,
        }
      );
      setEmail(res.data.email);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setMobile(res.data.mobile);
      setGender(res.data.gender);
    };
    fetchProfileDetails();
  }, [
    editFirstName,
    editLastName,
    editEmail,
    editMobile,
    editGender,
    user._id,
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

  const changeFirstName = async (event) => {
    const { token } = parseCookies();
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    event.preventDefault();
    // const res = await axios.patch("/account/profile", {
    await axios.patch(
      "/user/profile",
      {
        userId: user._id,
        firstName,
      },
      {
        headers: headers,
      }
    );
  };

  const changeLastName = async (event) => {
    const { token } = parseCookies();
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    event.preventDefault();
    // const sendLastName = await axios.patch("/account/profile", {
    await axios.patch(
      "/user/profile",
      {
        userId: user._id,
        lastName,
      },
      {
        headers: headers,
      }
    );
  };

  return (
    <div className="profile">
      <div className="profile__container ">
        <div className="profile__table">
          <div className="profile__name profile__row">
            <div className="profile__cell">
              First Name{" "}
              {!editFirstName ? (
                <EditIcon
                  className="icon__edit"
                  onClick={(event) => {
                    // editFirstName
                    setEditFirstName(!editFirstName);
                    // : setEditFirstName(true);
                  }}
                />
              ) : (
                <div></div>
              )}
            </div>

            <input
              type="text"
              readOnly={editFirstName ? false : true}
              className={
                "form__input profile__cell " + (editFirstName ? "" : "readOnly")
              }
              value={firstName}
              onChange={(event) => {
                console.log(event.target.value);
                setFirstName(event.target.value);
              }}
            />
            <div className="profile__cell">
              Last Name{" "}
              {!editLastName ? (
                <EditIcon
                  className="icon__edit"
                  onClick={() => {
                    // editLastName
                    setEditLastName(!editLastName);
                    // : setEditLastName(true);
                  }}
                />
              ) : (
                <div></div>
              )}
            </div>
            <input
              type="text"
              readOnly={editLastName ? false : true}
              className={
                "form__input profile__cell " + (editLastName ? "" : "readOnly")
              }
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </div>

          <div className="profile__row">
            <div className="profile__cell"></div>
            <input
              type="button"
              className={
                editFirstName
                  ? "profile__cell btn cancel__btn btn-red"
                  : "profile__cell btn cancel__btn btn-red hide"
              }
              value="Cancel"
              onClick={() => {
                setEditFirstName(false);
              }}
            />
            <input
              type="button"
              className={
                editFirstName
                  ? "profile__cell btn save__btn"
                  : "profile__cell btn save__btn hide"
              }
              value="Save First Name"
              onClick={async (event) => {
                await changeFirstName(event);
                setEditFirstName(false);
              }}
            />
            <div className="profile__cell"></div>
            {!editFirstName ? (
              <div className="profile__cell"></div>
            ) : (
              <div></div>
            )}
            <input
              type="button"
              className={
                editLastName
                  ? "profile__cell btn cancel__btn btn-red "
                  : "profile__cell btn cancel__btn btn-red hide"
              }
              value="Cancel"
              onClick={() => {
                setEditLastName(false);
              }}
            />
            <input
              type="button"
              className={
                editLastName
                  ? "profile__cell btn save__btn"
                  : "profile__cell btn save__btn hide"
              }
              value="Save Last Name"
              onClick={async (event) => {
                await changeLastName(event);
                setEditLastName(false);
              }}
            />
          </div>

          <div className="profile__row">
            <div className="profile__email profile__cell">
              Email{" "}
              {/* {!editEmail ? (
                <EditIcon
                  className="icon__edit"
                  onClick={() => {
                    editEmail ? setEditEmail(false) : setEditEmail(true);
                  }}
                />
              ) : (
                <div></div>
              )} */}
            </div>
            <input
              className="email form__input profile__cell readOnly"
              readOnly={editEmail ? false : true}
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="text"
            />
          </div>
          {/* <div className="profile__row">
            <div className="profile__cell"></div>
            <input
              type="button"
              className={
                editEmail
                  ? "profile__cell btn cancel__btn "
                  : "profile__cell btn cancel__btn hide"
              }
              value="Cancel"
              onClick={() => {
                setEditEmail(false);
              }}
            />
            <input
              type="button"
              className={
                editEmail
                  ? "profile__cell btn save__btn"
                  : "profile__cell btn save__btn hide"
              }
              value="Save Email"
            />
          </div> */}
          <div className="profile__row">
            <div className="profile__mobile profile__cell">
              Mobile{" "}
              {/* {!editMobile ? (
                <EditIcon
                  className="icon__edit"
                  onClick={() => {
                    editMobile ? setEditMobile(false) : setEditMobile(true);
                  }}
                />
              ) : (
                <div></div>
              )} */}
            </div>
            <PhoneInput
              className="profile__cell phoneInputReadOnly"
              readOnly={editMobile ? false : true}
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
              disabled={true}
            />
            <div className="profile__gender profile__cell">
              Gender{" "}
              {/* {!editGender ? (
                <EditIcon
                  className="icon__edit"
                  onClick={() => {
                    editGender ? setEditGender(false) : setEditGender(true);
                  }}
                />
              ) : (
                <div></div>
              )} */}
            </div>
            {/* <Dropdown
              className="dropdown__menu profile__gender profile__cell"
              options={options}
              value={gender}
              placeholder="Select a gender..."
              onChange={(event) => {
                setGender(event.value);
              }}
            /> */}
            <input
              readOnly={editGender ? false : true}
              className="form__input readOnly"
              type="text"
              placeholder="Gender"
              value={gender}
            />
          </div>
          {/* <div
            className={
              editMobile || editGender ? " profile__row" : " hide profile__row"
            }
          >
            <div className="profile__cell"></div>
            <input
              type="button"
              className={
                editMobile
                  ? "profile__cell btn cancel__btn "
                  : "profile__cell btn cancel__btn hide"
              }
              value="Cancel"
              onClick={() => {
                setEditMobile(false);
              }}
            />
            <input
              type="button"
              className={
                editMobile
                  ? "profile__cell btn save__btn"
                  : "profile__cell btn save__btn hide"
              }
              value="Save Mobile Number"
            />
            <div className="profile__cell"></div>
            {!editMobile ? <div className="profile__cell"></div> : <div></div>}
            <input
              type="button"
              className={
                editGender
                  ? "profile__cell btn cancel__btn "
                  : "profile__cell btn cancel__btn hide"
              }
              value="Cancel"
              onClick={() => {
                setEditGender(false);
              }}
            />
            <input
              type="button"
              className={
                editGender
                  ? "profile__cell btn save__btn"
                  : "profile__cell btn save__btn hide"
              }
              value="Save Gender"
            />
          </div> */}
        </div>
        <div className="profile__buttons">
          <Link to="/changePassword">
            <input
              className="btn profile__btn changePassword__btn"
              value="Change Password"
              type="button"
            />
          </Link>
          {/* <input
            className="btn profile__btn"
            value="Save Changes"
            type="button"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
