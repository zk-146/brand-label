import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AboutUs from "./pages/AboutUs/AboutUs";
import Account from "./pages/Account/Account";
import AddBrands from "./pages/AddBrands/AddBrands";
import AirpodCovers from "./pages/AirpodCovers/AirpodCovers";
import Cart from "./pages/Cart/Cart";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Checkout from "./pages/Checkout/Checkout";
import Create from "./pages/Create/Create";
import Edit from "./pages/Edit/Edit";
import Footer from "./Components/Footer/Footer";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MobileCovers from "./pages/MobileCovers/MobileCovers";
import Navbar from "./Components/Navbar/Navbar";
import Navigation from "./Components/Navigation/Nav";
import ProductPage from "./pages/Product/Product";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import ProtectedRouteUser from "./ProtectedRouteUser";
import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
import SignUp from "./pages/SignUp/SignUp";
import SmartWatches from "./pages/SmartWatches/SmartWatches";
import TemperedGlasses from "./pages/TemperedGlasses/TemperedGlasses";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import Wishlist from "./pages/Wishlist/Wishlist";
import { parseCookies } from "nookies";

function App() {
  const cookie = parseCookies();
  const isAuth = cookie.isAuth ? JSON.parse(cookie.isAuth) : false;
  const user = cookie.user ? JSON.parse(cookie.user) : null;

  let width = window.innerWidth;

  return (
    <div className="App">
      <Router>
        <div className="content-wrap">
          <Switch>
            <Route path="/wishlist">
              <Navbar />
              <Navigation />
              <Wishlist />
            </Route>
            <Route path="/terms-of-service">
              <Navbar />
              <Navigation />
              <TermsOfService />
            </Route>
            <Route path="/temperedGlasses">
              <Navbar />
              <Navigation />
              <TemperedGlasses />
            </Route>
            <Route path="/smartWatches">
              <Navbar />
              <Navigation />
              <SmartWatches />
            </Route>
            <Route path="/refund-policy">
              <Navbar />
              <Navigation />
              <RefundPolicy />
            </Route>
            {user === null && (
              <Route path="/signup">
                <Navbar />
                <Navigation />
                <SignUp />
              </Route>
            )}
            <Route path="/mobileCovers">
              <Navbar />
              <Navigation />
              <MobileCovers />
            </Route>
            {user === null && (
              <Route path="/login">
                <Navbar />
                <Navigation />
                <Login />
              </Route>
            )}
            {user === null && (
              <Route path="/forgotpassword">
                <Navbar />
                <Navigation />
                <ForgotPassword />
              </Route>
            )}
            <ProtectedRouteAdmin path="/edit/:id" component={Edit} />
            <Route path="/cart">
              <Navbar />
              <Navigation />
              <Cart />
            </Route>
            <ProtectedRouteUser
              path="/checkout"
              component={Checkout}
              isAuth={isAuth}
            />
            <ProtectedRouteUser
              path="/changePassword"
              component={ChangePassword}
              isAuth={isAuth}
            />
            <ProtectedRouteAdmin path="/create" component={Create} />
            <Route path="/airpodCovers">
              {width < "768px" ? <></> : <Navbar />}
              {width > "768px" ? <></> : <Navigation />}
              <AirpodCovers />
            </Route>
            <ProtectedRouteAdmin path="/addbrands" component={AddBrands} />
            <ProtectedRouteUser path="/account" component={Account} />
            <Route path="/product/:id">
              <Navbar />
              <Navigation />
              <ProductPage />
            </Route>
            <Route path="/about-us">
              <Navbar />
              <Navigation />
              <AboutUs />
            </Route>
            <Route path="/">
              <Navbar />
              <Navigation />
              <Home />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
