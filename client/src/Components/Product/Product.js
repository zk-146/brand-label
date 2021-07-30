import "./Product.css";
import Sidebar from "../Filter/Filter";
import ProductCard from "../ProductCard/ProductCard";
import { useStateValue } from "../GlobalContext/StateProvider";
import { useEffect, useState } from "react";
import postCart from "../Fetch/Cart/postCart";
import postWishlist from "../Fetch/Wishlist/postWishlist";
import putWishlist from "../Fetch/Wishlist/putWishlist";
import putCart from "../Fetch/Cart/putCart";
import { parseCookies } from "nookies";

function Product({
  pageTitle,
  products,
  setProducts,
  brand,
  path,
  productType,
}) {
  const [isInCart] = useState([]);
  const [{ isWishlisted, cartProducts }, dispatch] = useStateValue();
  const [isWish] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(true);
  // const [{ loading }] = useStateValue();
  // console.log("LOADING", loading);

  // const [loading, setLoading] = useState(false);

  // const changeLoading = useCallback(() => {
  //   setLoading(!loading);
  // }, [setLoading]);

  const [productsFilter, setProductsFilter] = useState([
    {
      product: "Mobile Cases",
      show: false,
    },
    {
      product: "Airpod Cases",
      show: false,
    },
    {
      product: "Tempered Glass",
      show: false,
    },
  ]);

  const [priceFilter, setPriceFilter] = useState([
    {
      price: "Rs. 200 - Rs. 599",
      show: false,
    },
    {
      price: "Rs. 600 - Rs. 999",
      show: false,
    },
    {
      price: "Rs. 1000 - Rs. 1499",
      show: false,
    },
  ]);

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

  const width = window.innerWidth;

  const [showFilterOption] = useState(() => {
    if (width > 585) {
      return false;
    }
    return true;
  });

  const [mobileFilter, setMobileFilter] = useState(false);

  return (
    <div className="product">
      <div className="product__container">
        <div className="header pageHeader">{pageTitle}</div>
        <div className="home__filterHeader">Filter</div>
        <hr />
        <div className="prfltr__wrapper">
          <div className="home__filter">
            <Sidebar
              productsFilter={productsFilter}
              setProductsFilter={setProductsFilter}
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              setProducts={setProducts}
              products={products}
              brand={brand}
              path={path}
              setLoading={setLoading}
              productType={productType}
              mobileFilter={mobileFilter}
              // changeLoading={changeLoading}
            />
          </div>
          {loading ? (
            <div className="loadingProducts">
              <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
              </div>
            </div>
          ) : !mobileFilter ? (
            <div className="home__products">
              <div className="home__cards">
                {products.length > 0 ? (
                  products.map((data, index) => {
                    let mrp;
                    data.mrp !== undefined ? (mrp = data.mrp) : (mrp = 0);
                    return (
                      <ProductCard
                        description={data.description}
                        name={data.name}
                        color={data.color}
                        price={data.sellingPrice}
                        favoriteActive={data.favorite}
                        mediaUrl={data.mediaUrl1}
                        addToWishlist={addToWishlist}
                        addToCart={addToCart}
                        key={data._id}
                        _id={data._id}
                        productQuantity={data.quantity}
                        isWish={isWishlisted}
                        isInCart={isInCart}
                        mrp={mrp}
                      />
                    );
                  })
                ) : (
                  <div className="noProduct">
                    No products were found matching your selection
                  </div>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {showFilterOption ? (
          <button
            className="btn btn-filterOption"
            onClick={() => setMobileFilter(!mobileFilter)}
          >
            {mobileFilter ? "Apply Filters" : "Filter"}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Product;
