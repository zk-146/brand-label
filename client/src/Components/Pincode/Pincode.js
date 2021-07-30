import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Pincode.css";

axios.defaults.withCredentials = false;

function Pincode({
  pincode,
  setPincode,
  setWrongPincode,
  city,
  setCity,
  district,
  setDistrict,
  state,
  setState,
}) {
  const firstRender = useRef(true);

  //   const [pincode, setPincode] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [district, setDistrict] = useState("");
  const [pincodeErr, setPincodeErr] = useState("");

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const fetch = async () => {
      if (pincode.length < 6) {
        setPincodeErr("PIN Code must be of 6 digits");
        setWrongPincode(true);
        setCity("");
        setDistrict("");
        setState("");
        return;
      }
      if (pincode.length === 6) {
        setPincodeErr("");
        await axios
          .get(`https://api.postalpincode.in/pincode/${pincode}`)
          .then((res) => {
            setState(res.data[0].PostOffice[0].State);
            setDistrict(res.data[0].PostOffice[0].District);
            setCity(res.data[0].PostOffice[0].Block);
            setWrongPincode(false);
          })
          .catch((err) => {
            setWrongPincode(true);
            setPincodeErr("Invalid PIN Code");
          });
      }
    };
    fetch();
  }, [pincode, setWrongPincode, setCity, setDistrict, setState]);

  return (
    <div className="pincode">
      <div className="pincode__container">
        <div className="pincode__input">
          <input
            className="form__input pincode__input"
            type="text"
            value={pincode}
            placeholder="Pincode*"
            maxLength="6"
            onChange={(event) => {
              setPincode(event.target.value);
            }}
          />
          {pincodeErr.length > 0 && (
            <div className="input__error pincode__error">{pincodeErr}</div>
          )}
        </div>
        <input
          className="form__input"
          type="text"
          value={city}
          placeholder="City*"
          readOnly={true}
        />
        <input
          className="form__input"
          type="text"
          value={district}
          placeholder="District*"
          readOnly={true}
        />
        <input
          className="form__input"
          type="text"
          value={state}
          placeholder="State*"
          readOnly={true}
        />
      </div>
    </div>
  );
}

export default Pincode;
