import "./Payment.css";

import { useEffect, useState } from "react";

import OrderPlaced from "../OrderPlaced/OrderPlaced";
import { Redirect } from "react-router-dom";
import axios from "../../../axios";
import { parseCookies } from "nookies";
import paymentHandler from "../../../helpers/paymentHandler.";
import { useStateValue } from "../../GlobalContext/StateProvider";

function Payment() {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selected, setSelected] = useState(true);
  const [, dispatch] = useStateValue();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [order, setOrder] = useState([]);

  const [load, setLoad] = useState(() => {
    const cookie = parseCookies();
    // const addressId = cookie.addressId ? JSON.parse(cookie.addressId) : "";
    const addressId = cookie.addressId ? cookie.addressId : "";
    if (addressId !== "") {
      return true;
    } else {
      return false;
    }
  });

  const [, setLoading] = useState(true);

  const handlePayment = async (event) => {
    if (selectedPayment === "cod" || selectedPayment === "card") {
      setSelected(true);
      if (selectedPayment === "card") {
        paymentHandler(event, setOrderPlaced, setOrder);
      }
      if (selectedPayment === "cod") {
        const cookie = parseCookies();
        const addressId = cookie.addressId ? cookie.addressId : "";

        const res = await axios.post("/orderCod", {
          paymentType: "cod",
          addressId: addressId,
        });
        setOrderPlaced(true);
        setOrder(res.data);
      }
    } else {
      setSelected(false);
    }
    const res = axios.post("/fetchTotalProducts");

    dispatch({
      type: "SET_TOTALCARTPRODUCTS",
      totalCartProducts: res.data,
    });
  };

  useEffect(() => {
    const cookie = parseCookies();
    const addressId = cookie.addressId ? cookie.addressId : "";
    const checkAddress = async () => {
      const res = await axios.post("/save-address", {
        addressId,
      });
      setLoading(false);
      if (res.data !== true) {
        setLoad(false);
      } else {
        setLoad(true);
      }
    };
    checkAddress();
  }, [load]);

  if (load) {
    if (!orderPlaced)
      return (
        <div className="payment">
          <div className="payment__container">
            <div className="address__header">Payment</div>
            <form className="payment__contents">
              {!selected ? (
                <p className="payment__notSelected">
                  Select a payment method to place your order
                </p>
              ) : (
                <div></div>
              )}
              <div className="payment__cod">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  className="payment__option"
                  value="cod"
                  onChange={() => {
                    setSelected(true);
                    setSelectedPayment("cod");
                  }}
                />
                <label htmlFor="cod">Cash on delivery</label>
              </div>
              <div className="payment__debitCard">
                <input
                  type="radio"
                  id="debitCard"
                  name="payment"
                  className="payment__option"
                  value="card"
                  onChange={() => {
                    setSelected(true);
                    setSelectedPayment("card");
                  }}
                />
                <label htmlFor="debitCard">
                  Credit Card/Debit Card/NetBanking
                </label>
              </div>
            </form>
            <input
              type="button"
              className="btn address__btn"
              value="Place Order"
              onClick={(event) => {
                handlePayment(event);
              }}
            />
          </div>
        </div>
      );
    else return <OrderPlaced order={order} />;
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
}

export default Payment;
