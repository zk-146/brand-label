import "./OrderPlaced.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useHistory } from "react-router";

function OrderPlaced({ order }) {
  const history = useHistory();

  return (
    <div className="orderPlaced">
      <div className="orderPlaced__container">
        <div className="orderPlaced__message">
          <CheckCircleIcon />{" "}
          <p>You order has been placed. Thank you for shopping</p>
        </div>
        <div className="orderPlaced__continue">
          <button
            className="btn"
            onClick={() => {
              history.push("/");
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderPlaced;
