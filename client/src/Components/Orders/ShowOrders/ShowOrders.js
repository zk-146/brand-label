import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import axios from "../../../axios";
import React, { useState } from "react";
import ProductCard from "../../ProductCard/ProductCard";
import ReturnPayment from "../Return/ReturnPayment/ReturnPayment";
import { CancelToken } from "axios";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { IoReloadCircle } from "react-icons/io5";
import "./ShowOrders.css";

function ShowOrders({ orders, setSelectedOption }) {
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [returnIds, setReturnIds] = useState([]);

  const [orderDetails, setOrderDetails] = useState([]);
  const [returnOrder, setReturnOrder] = useState(false);
  const [returnPayment, setReturnPayment] = useState(false);

  function convertTZ(date, tzString) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (event) => {
    if (event.currentTarget.value === "Yes") {
      await axios
        .post("/order/cancel", {
          orderId,
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            console.log(c);
          }),
        })
        .then(() => console.log("success"))
        .catch(function (err) {
          if (axios.isCancel(err)) {
            console.log("im canceled");
          } else {
            console.log("im server response error");
          }
        });
    }
    setOpen(false);
  };

  const handleReturnClick = (event) => {
    let tempReturn = new Set([...returnIds]);
    if (event.target.checked === false) {
      tempReturn.forEach((i) => {
        if (event.target.value === i) {
          tempReturn.delete(i);
          return setReturnIds(tempReturn);
        }
      });
    } else if (event.target.checked === true) {
      tempReturn.add(event.target.value);
      return setReturnIds(tempReturn);
    }
  };

  const handleProceed = () => {
    if (returnIds.size > 0) {
      setReturnPayment(true);
    }
  };

  return (
    <div>
      <div className="order__table">
        {!returnOrder &&
          orders.map((data) => {
            const orderDate = convertTZ(
              new Date(data.createdAt),
              "Asia/Kolkata"
            );
            return (
              <div className="" key={data._id}>
                <div className="order__row">
                  <div className="order__headerContainer">
                    <p className="order__subHeader"> Order Details </p>
                    {data.status === "Delivered" && (
                      <p className="text text-green">
                        <CheckCircleIcon /> Delivered
                      </p>
                    )}
                    {data.status === "Cancelled" && (
                      <p className="text text-red">
                        <CancelIcon /> Cancelled
                      </p>
                    )}
                    {data.status === "Returned" && (
                      <p className="text text-purple">
                        <IoReloadCircle
                          style={{
                            fontSize: "1.2rem",
                          }}
                        />{" "}
                        Returned
                      </p>
                    )}
                  </div>
                  <div className="order__details">
                    {" "}
                    <div className="order__cell">
                      {data.status === "Returned" && <b>Return Initiated</b>}
                      {data.status !== "Returned" && (
                        <p>
                          Order Id: <b>{data.orderId}</b>
                        </p>
                      )}
                    </div>
                    <div className="order__cell">
                      Order Status: <b>{data.status}</b>
                    </div>
                    <div className="order__cell">
                      Payment:{" "}
                      {data.paymentType === "prepaid" && (
                        <b>{" Paid Online "}</b>
                      )}
                      {data.paymentType === "cod" && (
                        <b>{" Cash on Delivery "}</b>
                      )}
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
                  {data.status === "In Transit" && (
                    <div className="order__buttons">
                      <Button
                        class="btn btn-red"
                        value="Cancel"
                        onClick={() => {
                          setOrderId(data._id);
                          handleClickOpen();
                        }}
                      >
                        Cancel
                      </Button>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle id="alert-dialog-slide-title">
                          {"Are you sure?"}
                        </DialogTitle>

                        <DialogActions>
                          <Button
                            color="default"
                            autoFocus
                            value={"No"}
                            onClick={(event) => {
                              handleClose(event);
                            }}
                          >
                            No
                          </Button>
                          <Button
                            color="secondary"
                            autoFocus
                            value={"Yes"}
                            onClick={(event) => {
                              handleClose(event);
                            }}
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
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
                    </div>
                  )}
                  {data.status === "Delivered" && (
                    <div className="order__buttons">
                      <input
                        className="btn"
                        type="button"
                        value="Return"
                        onClick={() => {
                          setOrderDetails(...[data]);
                          setReturnOrder(true);
                        }}
                      />
                    </div>
                  )}
                  {data.status === "Returned" && (
                    <div className="order__buttons">
                      <input
                        className="btn btn-disabled"
                        type="button"
                        value={data.status}
                        disabled={true}
                      />
                    </div>
                  )}
                  {data.status === "Cancelled" && (
                    <div className="order__buttons">
                      <input
                        className="btn btn-disabled"
                        type="button"
                        value="Order Cancelled"
                        disabled={true}
                      />
                    </div>
                  )}
                  <p className="order__subHeader">Products Ordered</p>
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
        <div className="order__products">
          {returnOrder &&
            !returnPayment &&
            orderDetails.products.map((data) => {
              return (
                <div className="order__cell" key={data._id + "return"}>
                  <label>
                    <div style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        className="customCheckbox"
                        value={data._id}
                        onClick={(event) => {
                          console.log(returnIds);
                          handleReturnClick(event);
                        }}
                      />
                      <p style={{ width: "15rem", cursor: "pointer" }}>
                        {data.product.name +
                          " adasdas dasd " +
                          data.product.color}
                      </p>
                    </div>
                    <ProductCard
                      description={data.product.description}
                      name={data.product.name}
                      color={data.product.color}
                      price={data.price}
                      favoriteActive={data.product.favorite}
                      mediaUrl={data.product.mediaUrl1}
                      page={"return"}
                      _id={data.product._id}
                      quantity={data.quantity}
                    />
                  </label>
                </div>
              );
            })}
        </div>
        {returnOrder && !returnPayment && (
          <input
            className="btn"
            type="button"
            value="Proceed"
            style={{ alignSelf: "flex-end" }}
            onClick={() => {
              handleProceed();
            }}
          />
        )}
        {returnPayment && (
          <ReturnPayment
            orderDetails={orderDetails}
            returnIds={returnIds}
            setReturnPayment={setReturnPayment}
            setReturnOrder={setReturnOrder}
            setSelectedOption={setSelectedOption}
          />
        )}
      </div>
    </div>
  );
}

export default ShowOrders;
