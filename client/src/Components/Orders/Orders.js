import { useEffect, useState } from "react";
import axios from "../../axios";
import "./Order.css";
import Return from "./ShowReturn/ShowReturn";
import ShowOrders from "./ShowOrders/ShowOrders";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState("Orders");
  const options = ["Orders", "Returns"];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await axios.get("allOrders");
      let tempOrders = res.data.reverse();
      setOrders(tempOrders);
      setLoading(false);
    };
    if (selectedOption === "Orders") fetchOrders();
  }, [selectedOption]);

  return (
    <div className="order">
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
        <div className="order__container">
          <div className="account__containerBoxLeft">
            {options.map((data, index) => {
              return (
                <div
                  className={
                    selectedOption === data
                      ? "account__boxLeftOption account__boxLeftOptionActive"
                      : "account__boxLeftOption "
                  }
                  key={data + index}
                  onClick={() => {
                    setSelectedOption(data);
                  }}
                >
                  <p>{data}</p>
                </div>
              );
            })}
          </div>
          {selectedOption === "Orders" && orders.length > 0 && (
            <ShowOrders orders={orders} setSelectedOption={setSelectedOption} />
          )}
          {selectedOption === "Orders" && orders.length === 0 && (
            <div className="orders__nothingToShow">
              <h3 className="orders__nothingToShowText">
                You have placed no orders
              </h3>
            </div>
          )}
          {selectedOption === "Returns" && (
            <div>
              <Return />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
