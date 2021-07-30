import "./Product.css";

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import axios from "../../axios";
import { parseCookies } from "nookies";
import postCart from "../../Components/Fetch/Cart/postCart";
import postWishlist from "../../Components/Fetch/Wishlist/postWishlist";
import putCart from "../../Components/Fetch/Cart/putCart";
import putWishlist from "../../Components/Fetch/Wishlist/putWishlist";
import { useStateValue } from "../../Components/GlobalContext/StateProvider";

const ProductPage = () => {
  const cookie = parseCookies();
  const { id } = useParams();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  const [isInCart] = useState([]);
  // const [{ isWishlisted, cartProducts }, dispatch] = useStateValue();
  const [{ cartProducts }, dispatch] = useStateValue();
  const [isWish] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [product, setProduct] = useState([]);

  const [loading, setLoading] = useState(true);

  const history = useHistory();
  // const [similarLoading, setSimilarLoading] = useState(true);

  const [addToWishlistActive, setAddToWishlistActive] = useState(true);
  const [addToCartActive, setAddToCartActive] = useState(true);

  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (user !== "") postWishlist(setWishlist);
  }, [id, addToWishlistActive]);

  useEffect(() => {
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (user !== "") postCart(setCart);
  }, [id]);

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
    if (similarProducts && user !== "") {
      const checkWishes = () => {
        for (let wish in wishlist) {
          for (let product in similarProducts) {
            if (wishlist[wish].product._id === similarProducts[product]._id) {
              isWish.push(similarProducts[product]._id);
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
  }, [wishlist, dispatch, isWish, similarProducts]);

  useEffect(() => {
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (similarProducts && user !== "") {
      const checkCart = () => {
        for (let cartProduct in cart) {
          for (let product in similarProducts) {
            if (
              cart[cartProduct].product._id === similarProducts[product]._id
            ) {
              isInCart.push(similarProducts[product]._id);
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
  }, [dispatch, similarProducts, cart, isInCart, cartProducts]);

  //fetchSimilar Products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios
        .get("/getProduct", {
          params: {
            pid: id,
          },
        })
        .catch(() => setLoading(false));
      if (!res) {
        history.push("/");
        return;
      }
      if (res.data) {
        setProduct(res.data);
        setSelectedImage(res.data.mediaUrl1);
        const similar = await axios.get("/similarProducts", {
          params: { name: res.data.name },
        });
        let similarFilter = similar.data;
        similarFilter = similarFilter.filter((data, dine) => {
          return data._id !== res.data._id;
        });
        setSimilarProducts(similarFilter);
        // setSimilarLoading(false);
        setLoading(false);
      }
    };
    fetchData();
    return () => fetchData();
  }, [id, history]);

  const [isWish1] = useState([]);
  const [isInCart1] = useState([]);

  useEffect(() => {
    setAddToWishlistActive(true);
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (product && user !== "") {
      const checkWishes = () => {
        for (let wish in wishlist) {
          if (wishlist[wish].product._id === product._id) {
            isWish1.push(product._id);
          }
        }
      };
      checkWishes();
    }

    if (isWish1.includes(product._id)) {
      setAddToWishlistActive(false);
    }
    dispatch({
      type: "SET_WISHLIST",
      isWishlisted: isWish1,
    });
  }, [wishlist, dispatch, isWish1, product]);

  useEffect(() => {
    setAddToCartActive(true);
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (product && user !== "") {
      const checkCart = () => {
        for (let cartProduct in cart) {
          if (cart[cartProduct].product._id === product._id) {
            isInCart1.push(product._id);
          }
        }
      };
      checkCart();
    }

    if (isInCart1.includes(product._id)) {
      setAddToCartActive(false);
    }

    dispatch({
      type: "SET_CART",
      cartProducts: isInCart1,
    });
  }, [dispatch, cart, isInCart1, product]);

  let currencyPrice = null;
  if (product.sellingPrice !== undefined) {
    currencyPrice = product.sellingPrice
      .toString()
      .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }
  let currencyMrp = null;
  if (product.mrp !== undefined) {
    currencyMrp = product.mrp
      .toString()
      .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }

  const [selectedImage, setSelectedImage] = useState("");

  return (
    <div className="productPage">
      {loading ? (
        <div className="page__loading">
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        </div>
      ) : (
        <div className="productPage__container">
          <div className="productPage__left">
            <div className="productPage__images">
              <div className="productPage__secondaryImages">
                <img
                  className={
                    selectedImage === product.mediaUrl1
                      ? "productPage__secondaryImage productPage__secondaryImageSelected"
                      : "productPage__secondaryImage"
                  }
                  src={product.mediaUrl1}
                  alt="Product 1"
                  onClick={() => {
                    if (selectedImage !== product.mediaUrl1)
                      setSelectedImage(product.mediaUrl1);
                  }}
                />
                <img
                  className={
                    selectedImage === product.mediaUrl2
                      ? "productPage__secondaryImage productPage__secondaryImageSelected"
                      : "productPage__secondaryImage"
                  }
                  src={product.mediaUrl2}
                  alt="Product 2"
                  onClick={() => {
                    if (selectedImage !== product.mediaUrl2)
                      setSelectedImage(product.mediaUrl2);
                  }}
                />
                <img
                  className={
                    selectedImage === product.mediaUrl3
                      ? "productPage__secondaryImage productPage__secondaryImageSelected"
                      : "productPage__secondaryImage"
                  }
                  src={product.mediaUrl3}
                  alt="Product 3"
                  onClick={() => {
                    if (selectedImage !== product.mediaUrl3)
                      setSelectedImage(product.mediaUrl3);
                  }}
                />
                <img
                  className={
                    selectedImage === product.mediaUrl4
                      ? "productPage__secondaryImage productPage__secondaryImageSelected"
                      : "productPage__secondaryImage"
                  }
                  src={product.mediaUrl4}
                  alt="Product 4"
                  onClick={() => {
                    if (selectedImage !== product.mediaUrl4)
                      setSelectedImage(product.mediaUrl4);
                  }}
                />
                <img
                  className={
                    selectedImage === product.mediaUrl5
                      ? "productPage__secondaryImage productPage__secondaryImageSelected"
                      : "productPage__secondaryImage"
                  }
                  src={product.mediaUrl5}
                  alt="Product 5"
                  onClick={() => {
                    if (selectedImage !== product.mediaUrl5)
                      setSelectedImage(product.mediaUrl5);
                  }}
                />
              </div>
              <div className={"productPage__primaryImage"}>
                <img
                  className={
                    product.quantity === 0 ? " productPage__outOfStock" : ""
                  }
                  src={selectedImage}
                  alt="Product 1"
                />
              </div>
            </div>
          </div>
          <div className="productPage__right">
            <p className="productPage__name">
              {product.name + " " + product.color}
            </p>
            <div className="productPage__prices">
              <p className="productPage__price">₹{currencyPrice}</p>
              <p className="productPage__price productPage__priceStrikethrough">
                ₹{currencyMrp}
              </p>
            </div>
            <div className="productPage__btns">
              {!addToCartActive && user !== "" && product.quantity > 0 ? (
                <button
                  className="btn productPage__btn btn-active"
                  type="button"
                >
                  <Link className="link productPage__link" to="/cart">
                    <ShoppingCart /> <p>Go to Cart</p>
                  </Link>
                </button>
              ) : (
                product.quantity > 0 &&
                user !== "" && (
                  <input
                    className="btn productPage__btn"
                    type="button"
                    value="Add to cart"
                    onClick={() => {
                      if (!isInCart1.includes(product._id)) {
                        setAddToCartActive(false);
                        addToCartActive && putCart(product._id, dispatch);
                      }
                      // putCart(product._id, dispatch);
                    }}
                  />
                )
              )}
              {product.quantity === 0 && (
                <button
                  className="btn productPage__btn btn-disabled"
                  type="button"
                  disabled={true}
                >
                  <ShoppingCart /> <p>Add to cart</p>
                </button>
              )}

              {addToWishlistActive === false && user !== "" ? (
                <button
                  className="btn productPage__btn wishlist-active btn-active"
                  type="button"
                >
                  <FavoriteIcon /> <p>Wishlisted</p>
                </button>
              ) : (
                user !== "" && (
                  <input
                    className="btn productPage__btn"
                    type="button"
                    value="Add to wishlist"
                    onClick={() => {
                      if (!isWish1.includes(product._id)) {
                        setAddToWishlistActive(false);
                        addToWishlistActive && putWishlist(product._id, user);
                      }
                    }}
                  />
                )
              )}
              {user === "" && (
                <input
                  className="btn productPage__btn"
                  type="button"
                  value="Login to add to cart"
                  onClick={() => {
                    history.push("/login");
                  }}
                />
              )}
              {user === "" && (
                <input
                  className="btn productPage__btn"
                  type="button"
                  value="Login to add to wishlist"
                  onClick={() => {
                    history.push("/login");
                  }}
                />
              )}
              {user.role === "admin" ? (
                <Link to={"/edit/" + product._id}>
                  <input
                    className="btn productPage__btn"
                    type="button"
                    value="Edit"
                  />
                </Link>
              ) : (
                <div></div>
              )}
            </div>
            <div className="productPage__productDescription">
              <h3 className="productPage__descriptionHeader">
                Product Description
              </h3>
              <p className="productPage__description">{product.description}</p>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <div className="page__loading"></div>
      ) : (
        <div className="productPage__similarProducts">
          <hr />
          <h3 className="productPage__similarHeader header">
            Similar Products
          </h3>
          <div className="productPage__similarProductsContainer">
            {similarProducts.map((data) => {
              let mrp;
              data.mrp !== undefined ? (mrp = data.mrp) : (mrp = 0);
              return (
                <div className="productPage__similarProduct" key={data._id}>
                  <ProductCard
                    description={data.description}
                    color={data.color}
                    name={data.name}
                    price={data.sellingPrice}
                    favoriteActive={data.favorite}
                    mediaUrl={data.mediaUrl1}
                    productQuantity={data.quantity}
                    addToWishlist={addToWishlist}
                    addToCart={addToCart}
                    _id={data._id}
                    isWish={isWish}
                    isInCart={isInCart}
                    mrp={mrp}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
