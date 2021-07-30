import axios from "../../../axios";
import { parseCookies } from "nookies";

const postCart = async (setCart) => {
  const { token } = parseCookies();
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  if (user) {
    const res = await axios.post(
      `/cart`,
      {
        method: "POST",
        userId: user._id,
      },
      {
        headers: headers,
      }
    );
    setCart(res.data);
  }
};
export default postCart;
