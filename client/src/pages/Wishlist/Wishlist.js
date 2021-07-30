import "./Wishlist.css";

import { useEffect, useState } from "react";

import ProductCard from "../../Components/ProductCard/ProductCard";
import axios from "../../axios";
import { parseCookies } from "nookies";

function Wishlist() {
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  const [wishlist, setWishlist] = useState([]);
  const [emptyWishlist, setEmptyWishlist] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { token } = parseCookies();
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const fetchWishlist = async () => {
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
      setLoading(false);
    };
    fetchWishlist();

    return () => fetchWishlist();
  }, []);

  const handleRemove = async (pid, userId) => {
    const { token } = parseCookies();
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const res = await axios.delete(`/wishlist`, {
      headers: headers,

      method: "DELETE",
      data: {
        userId: user._id,
        productId: pid,
      },
    });
    const res2 = await res;
    setWishlist(res2.data);
  };

  useEffect(() => {
    wishlist.length <= 0 ? setEmptyWishlist(true) : setEmptyWishlist(false);
  }, [wishlist, emptyWishlist]);

  return (
    <div className="wishlist">
      <div className="wishlist__container">
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
            <div className="header pageHeader">Wishlist</div>
            <hr />
            <div className="home__cards">
              {wishlist.map((data, index) => {
                return (
                  <ProductCard
                    key={data._id}
                    handleRemove={handleRemove}
                    page="wishlist"
                    description={data.product.description}
                    name={data.product.name}
                    price={data.product.sellingPrice}
                    _id={data.product._id}
                    mediaUrl={data.product.mediaUrl1}
                    mrp={data.product.mrp}
                    productQuantity={data.product.quantity}
                    color={data.product.color}
                  />
                );
              })}
            </div>
          </div>
        )}
        {!user ? (
          <div className="cart__empty">Login to see your wishlist</div>
        ) : (
          <div></div>
        )}
        {user && emptyWishlist && !loading ? (
          <div className="wishlist__empty">Your wishlist is empty!</div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
