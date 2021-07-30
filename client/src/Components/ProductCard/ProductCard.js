import "./ProductCard.css";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CloseIcon from "@material-ui/icons/Close";
import Dropdown from "react-dropdown";
import FavoriteIcon from "@material-ui/icons/FavoriteSharp";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { parseCookies } from "nookies";
import sale from "./sale.jpg";
import { useState } from "react";
import { useStateValue } from "../GlobalContext/StateProvider";

const ProductCard = ({
  favoriteActive,
  page,
  name,
  price,
  mediaUrl,
  _id,
  handleRemove,
  addToWishlist,
  addToCart,
  productQuantity,
  quantity,
  isWish,
  isInCart,
  media,
  mrp,
  setLoading,
  color,
}) => {
  const [, dispatch] = useStateValue();
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  const [favorite, setFavorite] = useState(false);
  const [cart, setCart] = useState(false);
  const qtyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [qty, setQty] = useState(quantity);

  let currencyPrice = price
    .toString()
    .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  let currencyMrp = null;
  if (mrp) {
    currencyMrp = mrp
      .toString()
      .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }
  if (page === "return" || page === "orders" || page === "create") {
    productQuantity = 1;
  }

  return (
    <div className={"card " + (productQuantity > 0 ? "" : " card__outOfStock")}>
      <div
        className={
          "card__container " + (productQuantity > 0 ? "" : " card__opacity")
        }
      >
        {page !== "wishlist" &&
        page !== "cart" &&
        page !== "orders" &&
        page !== "return" &&
        productQuantity > 0 &&
        user ? (
          <div>
            <div
              className={
                page !== "create" && page !== "orders"
                  ? "card__wishlist" +
                    (isWish.includes(_id) || favorite
                      ? " card__wishlistActive"
                      : "")
                  : "card__wishlist"
              }
            >
              <FavoriteIcon
                onClick={() => {
                  favorite ? setFavorite(true) : setFavorite(true);
                  if (user && page !== "create" && page !== "orders") {
                    if (!favorite) addToWishlist(_id);
                  }
                }}
              />
            </div>
            <div
              className={
                page !== "create" && page !== "orders" && page !== "return"
                  ? "card__cart " +
                    (isInCart.includes(_id) || cart ? "card__cartActive" : "")
                  : "card__cart"
              }
            >
              <AddShoppingCartIcon
                onClick={() => {
                  cart ? setCart(true) : setCart(true);
                  if (user && page !== "create") {
                    if (!cart && !isInCart.includes(_id)) {
                      addToCart(_id);
                    }
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="card__wishlist">
              {user &&
              page !== "orders" &&
              page !== "return" &&
              (page === "wishlist" || page === "cart") ? (
                <CloseIcon
                  onClick={() => {
                    if (page === "cart") handleRemove(_id);
                    if (page === "wishlist") handleRemove(_id);
                  }}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
        {page !== "return" && (
          <Link className="link" to={"/product/" + _id}>
            {/* {page !== "orders" && page !== "return" && productQuantity > 0 ? (
              <div className="card__sale">
                <img className="card__saleImg" src={sale} alt="Sale" />
              </div>
            ) : (
              <div></div>
            )} */}
            <div className="card__imageContainer">
              <img
                className="card__image"
                // src={page === "create" ? media : mediaUrl}
                src={media !== undefined ? media : mediaUrl}
                alt={name + " " + color}
              />
            </div>
            <div className="card__title">
              <p>{name + " " + color}</p>
            </div>
            {/* <div className="card__description">
            <LinesEllipsis
              style={{ textAlign: "start" }}
              text={description}
              maxLine={3}
              lineheight="10"
              ellipsis="..."
              trimRight
            />
          </div> */}
            <div className="card__price">
              <div className="card__sellingPrice">
                <p>₹{currencyPrice}</p>
              </div>
              {mrp && (
                <div className="card__mrp">
                  <div className="card__strikethrough">
                    <p>₹{currencyMrp}</p>
                  </div>
                </div>
              )}
            </div>
          </Link>
        )}
        {page === "return" && (
          <div>
            {page !== "orders" ? (
              <div className="card__sale">
                <img className="card__saleImg" src={sale} alt="Sale" />
              </div>
            ) : (
              <div></div>
            )}
            <div className="card__imageContainer">
              <img
                className="card__image"
                src={page === "create" ? media : mediaUrl}
                alt="Product"
              />
            </div>
            <div className="card__title">
              <p>{name + " " + color}</p>
            </div>
            <div className="card__price">
              <div className="card__sellingPrice">
                <p>₹{currencyPrice}</p>
              </div>
              {mrp && (
                <div className="card__mrp">
                  <div className="card__strikethrough">
                    <p>₹{currencyMrp}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {page === "cart" && productQuantity > 0 ? (
          <div className="card__qty">
            <p>Qty</p>
            <Dropdown
              className="dropdown__menu card__qtyin"
              options={qtyList}
              // value={qty}
              placeholder={qty}
              onChange={async (event) => {
                setQty(event.value);
                const res = await axios.put("/cart", {
                  userId: user._id,
                  productId: _id,
                  quantity: event.value,
                });

                dispatch({
                  type: "SET_TOTALCARTPRODUCTS",
                  totalCartProducts: res.data,
                });
                setLoading(true);
              }}
            />
          </div>
        ) : (
          <div></div>
        )}

        {page === "orders" || page === "return" ? (
          <div className="card__qty">
            <p>Qty</p>
            <input
              className="dropdown__menu card__qtyin"
              placeholder={qty}
              value={qty}
              readOnly
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
