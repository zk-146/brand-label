import axios from "../axios";

const getProduct = async (id) => {
  const data = await axios.get("/getProduct", {
    params: {
      pid: id,
    },
  });
  return data;
};

export default getProduct;
