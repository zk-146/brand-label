import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../../ProductCard/ProductCard";

function Return() {
  const [loading, setLoading] = useState(true);
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await axios.get("/allReturns");
      let tempReturns = res.data.reverse();
      setReturns(tempReturns);
      console.log(tempReturns);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  function convertTZ(date, tzString) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }

  return (
    <div className="returns">
      {loading ? (
        <div className="loadingProducts">
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        </div>
      ) : (
        <div className="order__table">
          {returns.map((data) => {
            const orderDate = convertTZ(
              new Date(data.createdAt),
              "Asia/Kolkata"
            );
            return (
              <div className="" key={data._id}>
                <div className="order__row">
                  <p className="order__subHeader">Order Details</p>
                  <div className="order__details">
                    {" "}
                    <div className="order__cell">
                      Return Id: <b>{data.returnId}</b>
                    </div>
                    <div className="order__cell">
                      Return Status: <b>{data.status}</b>
                    </div>
                    <div
                      className="order__cell"
                      style={{
                        fontWeight: "500",
                      }}
                    >
                      {data.email}
                    </div>
                    <div
                      className="order__cell"
                      style={{
                        fontWeight: "500",
                      }}
                    >
                      {orderDate.toDateString()}
                    </div>
                    <div
                      className="order__cell"
                      style={{
                        fontWeight: "500",
                      }}
                    >
                      {data.address.address +
                        ", " +
                        data.address.city +
                        ", " +
                        data.address.district +
                        ", " +
                        data.address.state}
                    </div>
                  </div>
                  {/* <div className="order__buttons">
                    <a
                      href="https://www.shiprocket.in/shipment-tracking/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <input
                        className="btn btn-track"
                        type="button"
                        value="Track your order"
                      />
                    </a>
                  </div> */}
                  <p className="order__subHeader">Products Returned</p>
                  <div className="order__products">
                    {data.products.map((data) => {
                      return (
                        <div className="order__cell" key={data.product._id}>
                          <ProductCard
                            description={data.product.description}
                            name={data.product.name}
                            color={data.product.color}
                            price={data.price}
                            favoriteActive={data.product.favorite}
                            mediaUrl={data.product.mediaUrl1}
                            page={"orders"}
                            _id={data.product._id}
                            quantity={data.quantity}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          {returns.length === 0 && (
            <div className="orders__nothingToShow">
              <h3 className="orders__nothingToShowText">
                You have not requested for a return
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Return;
