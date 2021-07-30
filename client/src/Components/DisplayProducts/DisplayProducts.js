import "./DisplayProducts.css";

import React, { useEffect, useRef, useState } from "react";

import ProductCard from "../ProductCard/ProductCard";
import getProducts from "../Fetch/Product/getProducts";
import { parseCookies } from "nookies";
import postCart from "../Fetch/Cart/postCart";
import postWishlist from "../Fetch/Wishlist/postWishlist";
import putCart from "../Fetch/Cart/putCart";
import putWishlist from "../Fetch/Wishlist/putWishlist";
import { useStateValue } from "../GlobalContext/StateProvider";

function DisplayProducts({ type }) {
  const type1 = useRef();

  type1.current = type;
  const [isWish] = useState([]);
  const [isInCart] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [productType, setProductType] = useState(() => {
    if (type1.current === "iPhone Covers") {
      return "Mobile Covers";
    }
    if (type1.current === "Airpod Cases") {
      return "Airpod Cases";
    }
    // if (type1.current === "Watch Straps") {
    //   return "Smart Watch";
    // }
  });
  const modelName = "";
  const materialType = "";
  const style = "";
  useEffect(() => {
    if (type1.current === "iPhone Covers") {
      type1.current = "iphone";
      setProductType("Mobile Covers");
    }
    if (type1.current === "Airpod Cases") {
      type1.current = "apple";
      setProductType("Airpod Cases");
    }
    // if (type1.current === "Watch Straps") {
    //   type1.current = "apple";
    //   setProductType("Smart Watch");
    // }
    const iphoneProducts = async () => {
      const displayProduct = true;
      setLoading(true);
      await getProducts(
        type1.current,
        setProducts,
        productType,
        modelName,
        materialType,
        style,
        displayProduct
      );
      setLoading(false);
    };
    iphoneProducts();
  }, [productType]);

  const [{ isWishlisted, cartProducts }, dispatch] = useStateValue();

  useEffect(() => {
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (products && user !== "") {
      const checkCart = () => {
        for (let cartProduct in cart) {
          for (let product in products) {
            if (cart[cartProduct].product._id === products[product]._id) {
              isInCart.push(products[product]._id);
            }
          }
        }
      };
      checkCart();
    }
    dispatch({
      type: "SET_CART",
      cartProducts: isInCart,
    });
  }, [dispatch, products, cart, isInCart, cartProducts]);

  useEffect(() => {
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (user !== "") postWishlist(setWishlist);
  }, []);

  useEffect(() => {
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (user !== "") postCart(setCart);
  }, []);

  const addToWishlist = async (pid, userId) => {
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (user !== "") putWishlist(pid, userId);
  };

  const addToCart = async (pid, userId) => {
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (user !== "") putCart(pid, dispatch);
  };

  useEffect(() => {
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (products && user !== "") {
      const checkWishes = () => {
        for (let wish in wishlist) {
          for (let product in products) {
            if (wishlist[wish].product._id === products[product]._id) {
              isWish.push(products[product]._id);
            }
          }
        }
      };
      checkWishes();
    }
    dispatch({
      type: "SET_WISHLIST",
      isWishlisted: isWish,
    });
  }, [wishlist, dispatch, isWish, products]);

  useEffect(() => {
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (products && user !== "") {
      const checkCart = () => {
        for (let cartProduct in cart) {
          for (let product in products) {
            if (cart[cartProduct].product._id === products[product]._id) {
              isInCart.push(products[product]._id);
            }
          }
        }
      };
      checkCart();
    }
    dispatch({
      type: "SET_CART",
      cartProducts: isInCart,
    });
  }, [dispatch, products, cart, isInCart, cartProducts]);

  return (
    <div className="displayProducts">
      <div className="displayProducts__container">
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
          <div className="displayProducts__products">
            {products.map((data, index) => {
              return (
                <ProductCard
                  description={data.description}
                  name={data.name}
                  price={data.sellingPrice}
                  favoriteActive={data.favorite}
                  mediaUrl={data.mediaUrl1}
                  addToWishlist={addToWishlist}
                  addToCart={addToCart}
                  key={data._id}
                  _id={data._id}
                  isWish={isWishlisted}
                  page={"Home"}
                  isInCart={isInCart}
                  productQuantity={data.quantity}
                  mrp={data.mrp}
                  color={data.color}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayProducts;
