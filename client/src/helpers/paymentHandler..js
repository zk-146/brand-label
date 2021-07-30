import axios from "../axios";

const paymentHandler = async (e, setOrderPlaced, setOrder) => {
  const API_URL = "http://localhost:8000/";
  e.preventDefault();
  // const orderUrl = `${API_URL}order`;
  const response = await axios.get("/order");
  const { data } = response;
  const options = {
    key: process.env.RAZOR_PAY_TEST_KEY,
    name: "Brand Label",
    description: "Order products from Brand Label",
    order_id: data.id,
    handler: async (response) => {
      try {
        const paymentId = response.razorpay_payment_id;
        const url = `${API_URL}capture/${paymentId}`;
        // const captureResponse = await Axios.post(url, {});
        const captureResponse = await axios.post(url, {});
        console.log(captureResponse.data);
        setOrderPlaced(true);
        setOrder(captureResponse.data);
      } catch (err) {
        console.log(err);
      }
    },
    theme: {
      color: "#686CFD",
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};
export default paymentHandler;
