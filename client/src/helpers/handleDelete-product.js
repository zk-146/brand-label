import axios from "../axios";

const handleDeleteProduct = async (id) => {
  const res = await axios.delete("/", {
    params: { pid: id },
  });
  console.log(res);
  return res.status;
};

export default handleDeleteProduct;
