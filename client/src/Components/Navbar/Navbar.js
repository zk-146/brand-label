import "./Navbar.css";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddBoxIcon from "@material-ui/icons/AddBox";
// import EditIcon from "@material-ui/icons/Edit";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";
import { useStateValue } from "../GlobalContext/StateProvider";
import { parseCookies } from "nookies";
import cookies from "js-cookie";
import MobileCoverDropdown from "./Dropdown/MobileCoverDropdown/MobileCoverDropdown";
import AirpodCoverDropdown from "./Dropdown/AirpodCoverDropdown/AirpodCoverDropdown";
import SmartWatchDropdown from "./Dropdown/SmartWatchesDropdown/SmartWatchesDropdown";
import TemperedGlassDropdown from "./Dropdown/TemperedGlassDropdown/TemperedGlassDropdown";

function Navbar() {
  const width = window.innerWidth;

  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  const [{ totalCartProducts }, dispatch] = useStateValue();

  const history = useHistory();

  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      if (user !== "") {
        const res = await axios.post("/fetchTotalProducts");
        setTotalProducts(res.data);
      }
    };
    fetchTotalProducts();
  }, [totalCartProducts, user]);

  const removeCookie = async (event) => {
    event.preventDefault();
    await axios.post("/logout");
  };

  const userLogout = (event) => {
    event.preventDefault();
    dispatch({
      type: "REMOVE_USER",
      user: null,
      isAuth: null,
    });
    dispatch({
      type: "SET_TOTALCARTPRODUCTS",
      totalCartProducts: 0,
    });
    setTotalProducts(null);
    cookies.remove("user");
    cookies.remove("isAuth");
    history.push("/");
  };

  if (width < "768") {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__optionsLeft">
          <Link className="navbar__logo link" to="/">
            <img src="" alt="Logo" />
          </Link>

          <div className="navbar__mobileCovers">
            <Link className="link navbar__option" to="/mobileCovers">
              {/* <HomeIcon /> */}
              Mobile Covers
            </Link>
            <MobileCoverDropdown />
          </div>

          <div className="navbar__airpodCovers">
            <Link className="link navbar__option" to="/airpodCovers">
              {/* <HomeIcon /> */}
              Airpod Covers
            </Link>
            <AirpodCoverDropdown />
          </div>

          <div className="navbar__smartWatches">
            <Link className="link navbar__option" to="/smartwatches">
              {/* <HomeIcon /> */}
              Smart Watches
            </Link>
            <SmartWatchDropdown />
          </div>

          <div className="navbar__temperedGlasses">
            <Link className="link navbar__option" to="/temperedGlasses">
              {/* <HomeIcon /> */}
              Tempered Glasses
            </Link>
            <TemperedGlassDropdown />
          </div>
        </div>
        {/* <div className="navbar__optionsLeft"></div> */}

        <div className="navbar__options">
          <Link className="link navbar__option" to="/">
            <div className=""></div>
            <HomeIcon />
            <p>Home</p>
          </Link>

          {user !== "" ? (
            user.role === "user" || user.role === "root" ? (
              <Link className="link navbar__option" to="/account">
                <PersonIcon />
                <p>Account</p>
              </Link>
            ) : (
              <div> </div>
            )
          ) : (
            <div></div>
          )}

          {user !== "" ? (
            user.role === "admin" || user.role === "root" ? (
              <Link className="link navbar__option" to="/create">
                <AddBoxIcon />
                <p>Create</p>
              </Link>
            ) : (
              <div></div>
            )
          ) : (
            <div></div>
          )}

          {/* {user !== "" ? (
            user.role === "admin" || user.role === "root" ? (
              <Link className="link navbar__option" to="/edit">
                <EditIcon />
                <p>Edit</p>
              </Link>
            ) : (
              <div></div>
            )
          ) : (
            <div></div>
          )} */}

          {user !== "" ? (
            user.role === "admin" || user.role === "root" ? (
              <Link className="link navbar__option" to="/addbrands">
                <AddBoxIcon />
                <p>Add Brands</p>
              </Link>
            ) : (
              <div></div>
            )
          ) : (
            <div></div>
          )}

          <Link className="link navbar__option" to="/wishlist">
            <FavoriteIcon />
            <p>Wishlist</p>
          </Link>
          <Link className="link navbar__option" to="/cart">
            <ShoppingCart />
            <div className="cart__totalProducts">
              {totalCartProducts || totalProducts}
            </div>
            <p>Cart</p>
          </Link>
          {user !== "" ? (
            <Link
              className="link navbar__option"
              to="/"
              onClick={(event) => {
                userLogout(event);
                removeCookie(event);
              }}
            >
              <ExitToAppIcon />
              <p>Log Out</p>
            </Link>
          ) : (
            <Link className="link navbar__option" to="/login">
              <ExitToAppIcon />
              <p>Login/Sign Up</p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
