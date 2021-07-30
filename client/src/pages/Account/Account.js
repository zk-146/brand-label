import "./Account.css";

import Orders from "../../Components/Orders/Orders";
import Profile from "../../Components/Profile/Profile";
import { useState } from "react";
import { withRouter } from "react-router-dom";

function Account() {
  const options = ["Profile", "Orders"];
  const [selectedOption, setSelectedOption] = useState("Profile");

  return (
    <div className="account">
      <div className="account__container">
        <div className="header pageHeader">Account</div>
        <hr />
        <div className="account__containerBox">
          <div className={"account__containerBoxLeft"}>
            {options.map((data, index) => {
              return (
                <div
                  className={
                    (selectedOption === data
                      ? "account__boxLeftOption account__boxLeftOptionActive"
                      : "account__boxLeftOption ") +
                    (selectedOption === "Profile"
                      ? " account__profileActive "
                      : " account__ordersActive ")
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
          <div className="account__containerBoxRight">
            {selectedOption === "Profile" ? <Profile /> : <div></div>}
            {selectedOption === "Orders" ? <Orders /> : <div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Account);
