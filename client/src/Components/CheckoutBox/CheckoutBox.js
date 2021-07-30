import { Link } from "react-router-dom";
import "./CheckoutBox.css";

function CheckoutBOx({ cart }) {
  let total = 0;

  cart.map((data) => {
    return (total = total + data.product.sellingPrice * data.quantity);
  });

  return (
    <div className="checkoutBox">
      <div className="checkoutBox__container">
        <div className="checkoutBox__header">Checkout</div>
        <div className="checkoutBox__productsTable">
          <div className="checkoutBox__productRow">
            <div className="checkoutBox__productCellHeader checkoutBox__productNameHeader">
              Product
            </div>
            <div className="checkoutBox__productCellHeader">Quantity</div>
            <div className="checkoutBox__productCellHeader">Price</div>
            <div className="checkoutBox__productCellHeader">Total</div>
          </div>
          {cart.map((data, index) => {
            let currencyPrice = data.product.sellingPrice
              .toString()
              .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
            return (
              <div className="checkoutBox__productRow" key={data._id}>
                {/* <div className="checkoutBox__productRow" key={`product${index}`}> */}
                <div className="checkoutBox__productCell checkoutBox__productName">
                  {data.product.name}
                </div>
                <div
                  className="checkoutBox__productCell"
                  style={{ textAlign: "center" }}
                >
                  {data.quantity}
                </div>
                <div
                  className="checkoutBox__productCell"
                  // style={{ textAlign: "center" }}
                >
                  ₹ {currencyPrice}
                </div>
                <div
                  className="checkoutBox__productCell"
                  // style={{ textAlign: "center" }}
                >
                  ₹{" "}
                  {(data.product.sellingPrice * data.quantity)
                    .toString()
                    .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
                </div>
              </div>
            );
          })}
          <div className="checkoutBox__total checkoutBox__productRow">
            <div className="checkoutBox__totalTopCell checkoutBox__productCell"></div>
            <div className="checkoutBox__totalTopCell checkoutBox__productCell">
              Total
            </div>
            <div className="checkoutBox__productCell">=</div>
            <div className="checkoutBox__productCell">
              ₹{" "}
              {total
                .toString()
                .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
            </div>
          </div>
        </div>
        <Link to="/checkout/address" className="link checkoutBox__link">
          <input type="button" className="btn btn-checkoutBox" value="Next" />
        </Link>
      </div>
    </div>
  );
}

export default CheckoutBOx;
