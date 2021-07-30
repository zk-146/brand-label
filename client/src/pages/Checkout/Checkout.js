import "./Checkout.css";

import { Route, Switch } from "react-router-dom";

import Address from "../../Components/Checkout/Address/Address";
import Payment from "../../Components/Checkout/Payment/Payment";

function Checkout() {
  return (
    <div className="checkout">
      <div className="checkout__container">
        <div className="header pageHeader">Checkout</div>
        <hr />
        <Switch>
          <Route path="/checkout/address">
            <Address />
          </Route>
          <Route path="/checkout/payment">
            <Payment />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Checkout;
