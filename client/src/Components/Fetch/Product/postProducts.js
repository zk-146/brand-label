import { parseCookies } from "nookies";
import axios from "../../../axios";

const postProducts = async (
  productType,
  name,
  smallProductName,
  sellingPrice,
  mrp,
  description,
  mediaUrl1,
  mediaUrl2,
  mediaUrl3,
  mediaUrl4,
  mediaUrl5,
  brand,
  color,
  quantity,
  materialType,
  smartWatchStyle,
  displayProduct,
  setProductUploaded,
  productUploadedTime
) => {
  const { token } = parseCookies();
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  const res = await axios.post(
    "/",
    {
      productType,
      name,
      color,
      sellingPrice,
      mrp,
      description,
      mediaUrl1,
      mediaUrl2,
      mediaUrl3,
      mediaUrl4,
      mediaUrl5,
      brand,
      productName: smallProductName,
      materialType,
      style: smartWatchStyle,
      quantity,
      displayProduct,
      user,
    },
    { headers: headers }
  );

  if (res.error) {
    console.log("ERROR:", res.error);
  } else {
    setProductUploaded(true);
    productUploadedTime();
  }
};

export default postProducts;
