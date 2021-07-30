import axios from "../../../axios";
import { parseCookies } from "nookies";

const fetchWishlist = async (setWishlist) => {
  const { token } = parseCookies();
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  if (user) {
    const res = await axios.post(
      "/wishlist",
      {
        method: "POST",
        userId: user._id,
      },
      {
        headers: headers,
      }
    );
    setWishlist(res.data);
  }
};

export default fetchWishlist;
