import axios from "../axios";

const getBrands = async (productType) => {
  const res = await axios.get("/addbrands", {
    params: { productType: productType },
  });
  return res.data;
};

export default getBrands;
