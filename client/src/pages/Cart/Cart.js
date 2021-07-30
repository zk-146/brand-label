import "./Cart.css";

import { useEffect, useRef, useState } from "react";

import Checkout from "../../Components/CheckoutBox/CheckoutBox";
import ProductCard from "../../Components/ProductCard/ProductCard";
import axios from "../../axios";
import cookies from "js-cookie";
import { parseCookies } from "nookies";
import { useStateValue } from "../../Components/GlobalContext/StateProvider";

function Cart() {
  const firstRender = useRef(true);
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  const [cart, setCart] = useState([]);
  const [emptyCart, setEmptyCart] = useState(true);
  const [, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { token } = parseCookies();
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };
      const cookie = parseCookies();
      const user = cookie.user ? JSON.parse(cookie.user) : "";
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
      setLoading(false);
    };
    fetchData();
  }, [loading]);

  const handleRemove = async (pid, userId) => {
    const { token } = parseCookies();
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    const res = await axios.delete(`/cart`, {
      method: "DELETE",
      headers: headers,
      data: {
        userId: user._id,
        productId: pid,
      },
    });
    const res2 = await res;
    setCart(res2.data.cart);
    dispatch({
      type: "SET_TOTALCARTPRODUCTS",
      totalCartProducts: res.data.totalQuantity,
    });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (cart.length <= 0) {
      setEmptyCart(true);
      cookies.remove("addressId");
    } else {
      setEmptyCart(false);
    }
  }, [cart, emptyCart]);

  return (
    <div className="cart">
      <div className="cart__container">
        {loading ? (
          <div className="cart__empty">
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>
          </div>
        ) : (
          <div>
            <div className="header pageHeader">Cart</div>
            <hr />
            <div className="cart__Contents">
              <div className="home__cards">
                {cart.map((data, index) => {
                  return (
                    <ProductCard
                      key={data._id}
                      handleRemove={handleRemove}
                      page="cart"
                      description={data.product.description}
                      name={data.product.name}
                      price={data.product.sellingPrice}
                      _id={data.product._id}
                      mediaUrl={data.product.mediaUrl1}
                      quantity={data.quantity}
                      mrp={data.product.mrp}
                      productQuantity={data.product.quantity}
                      color={data.product.color}
                      setLoading={setLoading}
                    />
                  );
                })}
              </div>

              {cart.length > 0 ? <Checkout cart={cart} /> : <div></div>}
            </div>
          </div>
        )}
        {!user ? (
          <div className="cart__empty">Login to see your cart</div>
        ) : (
          <div></div>
        )}
        {user && emptyCart && !loading ? (
          <div className="cart__empty">Your cart is empty</div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Cart;
