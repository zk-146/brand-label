import { useEffect, useState } from "react";
import "./ReturnPayment.css";
import ifsc from "ifsc";
import axios from "../../../../axios";

function ReturnPayment({
  returnIds,
  orderDetails,
  setReturnPayment,
  setReturnOrder,
  setSelectedOption,
}) {
  const [ifscCode, setIfscCode] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [ifscDetails, setIfscDetails] = useState([]);
  const [accountNumErr, setAccountNumErr] = useState(false);
  const [ifscCodeErr, setIfscCodeErr] = useState(false);
  const [submit, setSubmit] = useState(false);

  let returnIds1 = [...returnIds];

  useEffect(() => {
    const checkIfsc = () => {
      const res = ifsc.validate(ifscCode);
      if (res) {
        ifsc.fetchDetails(ifscCode).then(function (res) {
          setIfscDetails([res]);
          if (submit) setIfscCodeErr(false);
        });
      } else {
        if (submit) setIfscCodeErr(true);
        setIfscDetails([]);
      }
    };
    checkIfsc();
  }, [ifscCode, submit]);

  useEffect(() => {
    const checkAccountNum = () => {
      if (submit)
        if (accountNum.length < 9) {
          setAccountNumErr(true);
        } else {
          setAccountNumErr(false);
        }
    };
    checkAccountNum();
  }, [accountNum, submit]);

  const acceptReturn = async () => {
    if (!accountNumErr && !ifscCodeErr) {
      await axios.post("/return", {
        orderDetails,
        returnIds1,
        accountNum,
        ifscCode,
      });
      setReturnPayment(false);
      setReturnOrder(false);
      setSelectedOption("Returns");
    }
  };

  return (
    <div className="returnPayment">
      <div className="returnPayment__container">
        <div className="returnPayment__inputs">
          <input
            type="text"
            className="form__input"
            placeholder="Account Number"
            value={accountNum}
            onChange={(event) => {
              setAccountNum(event.target.value);
            }}
          />
          {accountNumErr && (
            <p className="input__error">
              Account Number's length is less than minimum length
            </p>
          )}
          <input
            type="text"
            className="form__input"
            value={ifscCode}
            placeholder="IFSC Code"
            onChange={(event) => {
              setIfscCode(event.target.value);
            }}
          />
          {ifscCodeErr && <p className="input__error">Invalid IFSC code</p>}
          {ifscDetails.map((data) => {
            return (
              <div key={data}>
                <div>
                  <b>IFSC DETAILS</b>
                  <p className="returnPayment__ifscDetails">{data.BANK}</p>
                  <p className="returnPayment__ifscDetails">
                    {data.ADDRESS + " " + data.BRANCH + ", " + data.STATE}
                  </p>
                  {/* <p>{data.BRANCH}</p>
                  <p>{data.BRANCH}</p> */}
                </div>
              </div>
            );
          })}
        </div>
        <div className="returnPayment__btns">
          <input
            className="btn returnPayment__btn btn-red"
            type="button"
            value="Cancel"
          />
          <input
            className="btn returnPayment__btn"
            type="button"
            value="Confirm"
            onClick={() => {
              setSubmit(true);
              acceptReturn();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ReturnPayment;
