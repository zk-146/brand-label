import axios from "../../../axios";

const getProducts = async (
  brand,
  setProducts,
  productType,
  modelName,
  materialType,
  style,
  displayProduct
) => {
  await axios
    .get(`/`, {
      params: {
        productType,
        brand,
        modelName,
        materialType,
        style,
        displayProduct,
      },
    })
    .then((res2) => {
      setProducts(res2.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getProducts;
