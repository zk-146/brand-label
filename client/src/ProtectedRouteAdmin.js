import { Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import Nav from "./Components/Navigation/Nav";

function ProtectedRouteAdmin({ component: Component, ...rest }) {
  const cookies = parseCookies();
  const isAuth = cookies.isAuth ? JSON.parse(Cookies.get("isAuth")) : "";
  const user = cookies.user ? JSON.parse(Cookies.get("user")) : "";
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth === true && user.role === "admin") {
          return (
            <div>
              <Navbar />
              <Nav />
              <Component />
            </div>
          );
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default ProtectedRouteAdmin;
