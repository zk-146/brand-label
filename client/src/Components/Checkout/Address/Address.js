import { useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./Address.css";
import PhoneInput from "react-phone-number-input";
import { parseCookies, setCookie } from "nookies";
import axios from "../../../axios";
import Pincode from "../../Pincode/Pincode";
import cookies from "js-cookie";

function Address() {
  const firstRender = useRef(true);
  const [disabled, setDisabled] = useState(true);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const [addressErr, setAddressErr] = useState({});
  const [nameErr, setNameErr] = useState({});
  const [phoneErr, setPhoneErr] = useState({});
  const [pincodeErr, setPincodeErr] = useState({});

  const [wrongPincode, setWrongPincode] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [load, setLoad] = useState(true);
  const [sendingAddress, setSendingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [addressId, setAddressId] = useState("");

  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      const { token } = parseCookies();
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };
      const cookie = parseCookies();
      const user = cookie.user ? JSON.parse(cookie.user) : "";
      if (user) {
        const res = await axios.post(
          `/cart`,
          {
            method: "POST",
            userId: user._id,
          },
          {
            headers: headers,
          }
        );
        if (res.data.length === 0) setLoad(false);
        else setLoad(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const validateInputs = () => {
      const nameErr = {};
      const addressErr = {};
      const phoneErr = {};
      const pincodeErr = {};
      const cityErr = {};
      const districtErr = {};
      const stateErr = {};

      let isValid = false;
      if (name === "") {
        nameErr.fieldRequired = "This field is required";
        isValid = true;
      }
      if (address === "") {
        addressErr.fieldRequired = "This field is required";
        isValid = true;
      }
      if (phone === "") {
        phoneErr.fieldRequired = "This field is required";
        isValid = true;
      }
      if (pincode === "") {
        pincodeErr.fieldRequired = "This field is required";
        isValid = true;
      }
      if (city === "") {
        cityErr.fieldRequired = "This field is required";
        isValid = true;
      }
      if (district === "") {
        districtErr.fieldRequired = "This field is required";
        isValid = true;
      }
      if (state === "") {
        stateErr.fieldRequired = "This field is required";
        isValid = true;
      }
      if (address.trim().length < 10) {
        if (!addressErr.fieldRequired)
          addressErr.invalidAddress = "Please enter a valid address";
        isValid = true;
      }
      if (phone.trim().length < 13) {
        if (!phoneErr.fieldRequired)
          phoneErr.invalidPhone = "Please enter a 10 digit mobile number";
        isValid = true;
      }
      if (pincode.trim().length !== 6) {
        if (!pincodeErr.fieldRequired)
          pincodeErr.pincodeLength = "PIN Code must be of 6 digits";
        isValid = true;
      }
      setNameErr(nameErr);
      setAddressErr(addressErr);
      setPhoneErr(phoneErr);
      setPincodeErr(pincodeErr);
      return isValid;
    };

    if (submit) {
      setDisabled(validateInputs);
      setSubmit(false);
    }
  }, [
    name,
    address,
    phone,
    pincode,
    submit,
    disabled,
    history,
    wrongPincode,
    city,
    district,
    state,
  ]);

  useEffect(() => {
    const fetchSavedAddress = async () => {
      setLoading(true);
      const res = await axios.get("/save-address");
      let tempSavedAddresses = [];
      for (let i in res.data.addresses) {
        tempSavedAddresses.push(res.data.addresses[i].address);
      }

      setSavedAddresses(tempSavedAddresses);
      console.log(tempSavedAddresses.length);
      if (res.data.addresses.length === 0) {
        setNewAddress(true);
      }
      setLoading(false);
    };
    fetchSavedAddress();
  }, [newAddress]);

  const sendAddress = async () => {
    setSendingAddress(true);
    await axios.put("/save-address", {
      address: address,
      name,
      phone,
      pincode,
      city,
      district,
      state,
    });
    if (!disabled) {
      history.push("/checkout/payment");
    }
  };

  const changePhone = (event) => {
    try {
      if (event.length <= 13) {
        setPhone(event);
      } else {
        setPhone("");
      }
    } catch (err) {}
  };

  if (load) {
    if (newAddress) {
      return (
        <div className="address">
          <div className="address__container">
            <div className="address__header">Address</div>
            <div className="address__lines">
              <div className="address__line">
                {Object.keys(nameErr).map((key, index) => {
                  console.log("HERE");
                  return (
                    <div className="input__error" key={index}>
                      {nameErr[key]}
                    </div>
                  );
                })}
                <input
                  type="text"
                  className="address__input form__input"
                  placeholder="Name*"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div className="address__line">
                {Object.keys(phoneErr).map((key, index) => {
                  return (
                    <div className="input__error" key={index}>
                      {phoneErr[key]}
                    </div>
                  );
                })}
                <PhoneInput
                  international={true}
                  defaultCountry="IN"
                  countryCallingCodeEditable={false}
                  value={phone}
                  onChange={(event) => {
                    changePhone(event);
                  }}
                  countrySelectComponent="disabled"
                  autoComplete="tel"
                  limitMaxLength={true}
                  className="address__input"
                />
              </div>
              <div className="address__line">
                {Object.keys(addressErr).map((key, index) => {
                  return (
                    <div className="input__error" key={index}>
                      {addressErr[key]}
                    </div>
                  );
                })}
                <input
                  type="text"
                  className="form__input"
                  placeholder="Address (House No, Building, Street, Area)*"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </div>

              <div className="address__line">
                {Object.keys(pincodeErr).map((key, index) => {
                  return (
                    <div className="input__error" key={index}>
                      {pincodeErr[key]}
                    </div>
                  );
                })}
                <Pincode
                  pincode={pincode}
                  setPincode={setPincode}
                  city={city}
                  setCity={setCity}
                  district={district}
                  setDistrict={setDistrict}
                  state={state}
                  setState={setState}
                  setDisabled={setDisabled}
                  setWrongPincode={setWrongPincode}
                />
              </div>
            </div>
            <div className="link link__addressBtn" to="/checkout/payment">
              {!sendingAddress ? (
                <div>
                  <input
                    type="button"
                    className="btn"
                    value="Saved Addresses"
                    onClick={() => {
                      setNewAddress(!newAddress);
                    }}
                    style={{ marginRight: "1rem" }}
                  />
                  <input
                    type="submit"
                    className="btn address__btn"
                    value="Proceed"
                    onClick={() => {
                      setSubmit((change) => !change);
                      if (!disabled) {
                        sendAddress();
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="cart__empty">
                  <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="address">
          {!loading ? (
            <div className="address__container">
              <div className="address__header">Saved Addresses</div>
              {savedAddresses.map((data, index) => {
                return (
                  <div className="savedAddress__info" key={data._id}>
                    <label
                      className="saved__addressNumber"
                      // htmlFor={"savedAddress__radio" + data._id}
                      style={{ textAlign: "center" }}
                    >
                      <input
                        id={"savedAddress__radio" + index}
                        className="savedAddress__radio customCheckbox"
                        type="radio"
                        value={data._id}
                        onClick={(event) => {
                          if (event.target.checked) {
                            for (let i = 0; i < savedAddresses.length; i++) {
                              document.getElementById(
                                "savedAddress__radio" + i
                              ).checked = false;
                            }
                            setAddressId("");
                          }
                        }}
                        onChange={(event) => {
                          setAddressId(event.target.value);
                          document.getElementById(
                            "savedAddress__radio" + index
                          ).checked = true;
                        }}
                      />{" "}
                      <b> {data.name}</b>
                    </label>
                    <div className="savedAddress__detail">
                      <p>
                        Mobile: <b> {data.mobile}</b>
                      </p>
                    </div>
                    {data.address}
                    {", " + data.city}
                    {", " + data.district}
                    {", " + data.state}
                  </div>
                );
              })}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <input
                  type="button"
                  className="btn"
                  value="New Address"
                  onClick={() => {
                    setNewAddress(!newAddress);
                  }}
                  style={{ marginRight: "1rem" }}
                />
                <input
                  type="button"
                  className="btn"
                  value="Next"
                  onClick={() => {
                    if (addressId !== "") {
                      cookies.remove("addressId");
                      setCookie(null, "addressId", addressId, {
                        expires: new Date(new Date().getTime() + 604800 * 1000),
                      });
                      history.push("/checkout/payment");
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="loadingProducts">
              <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
              </div>
            </div>
          )}
        </div>
      );
    }
  } else {
    return <Redirect to={{ pathname: "/mobileCovers" }} />;
  }
}

export default Address;
