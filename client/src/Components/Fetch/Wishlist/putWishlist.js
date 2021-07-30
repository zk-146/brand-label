import axios from "../../../axios";
import { parseCookies } from "nookies";

const putWishlist = async (pid, userId) => {
  const { token } = parseCookies();
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  await axios.put(
    `/wishlist`,
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
};
export default putWishlist;
