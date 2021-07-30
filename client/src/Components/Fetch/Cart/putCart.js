import { parseCookies } from "nookies";
import axios from "../../../axios";

const putCart = async (pid, dispatch) => {
  const { token } = parseCookies();
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  const res = await axios.put(
    `/cart`,
    {
      method: "PUT",
      userId: user._id,
      productId: pid,
      quantity: "1",
    },
    {
      headers: headers,
    }
  );
  dispatch({
    type: "SET_TOTALCARTPRODUCTS",
    totalCartProducts: res.data,
  });
};

export default putCart;
