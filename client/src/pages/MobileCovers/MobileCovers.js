import "./MobileCovers.css";

import { Route, Switch, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Product from "../../Components/Product/Product";

function MobileCovers() {
  let location = useLocation();
  const [brand, setBrand] = useState("");
  const [products, setProducts] = useState([]);
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
    if (location.pathname === "/mobileCovers/iphone") {
      setBrand("iphone");
    } else if (location.pathname === "/mobileCovers/samsung") {
      setBrand("samsung");
    } else if (location.pathname === "/mobileCovers/oneplus") {
      setBrand("oneplus");
    } else if (location.pathname === "/mobileCovers/oppo") {
      setBrand("oppo");
    } else if (location.pathname === "/mobileCovers/realme") {
      setBrand("realme");
    } else if (location.pathname === "/mobileCovers/vivo") {
      setBrand("vivo");
    } else if (location.pathname === "/mobileCovers/xiaomi") {
      setBrand("xiaomi");
    } else if (location.pathname === "/mobileCovers") {
      setBrand("");
    }
  }, [location, brand, path]);

  return (
    <div>
      {location.pathname === "/mobileCovers" ? (
        <Product
          pageTitle={"Mobile Covers"}
          location={location}
          brand={brand}
          path={path}
          products={products}
          setProducts={setProducts}
          productType={"Mobile Covers"}
        />
      ) : (
        <div></div>
      )}

      <Switch>
        <Route path="/mobileCovers/iphone">
          <Product
            pageTitle={"Mobile Covers"}
            location={location}
            brand={brand}
            path={path}
            products={products}
            setProducts={setProducts}
            productType={"Mobile Covers"}
          />
        </Route>
        <Route path="/mobileCovers/samsung">
          <Product
            pageTitle={"Mobile Covers"}
            location={location}
            brand={brand}
            path={path}
            products={products}
            setProducts={setProducts}
            productType={"Mobile Covers"}
          />
        </Route>
        <Route path="/mobileCovers/oneplus">
          <Product
            pageTitle={"Mobile Covers"}
            location={location}
            brand={brand}
            path={path}
            products={products}
            setProducts={setProducts}
            productType={"Mobile Covers"}
          />
        </Route>
        <Route path="/mobileCovers/oppo">
          <Product
            pageTitle={"Mobile Covers"}
            location={location}
            brand={brand}
            path={path}
            products={products}
            setProducts={setProducts}
            productType={"Mobile Covers"}
          />
        </Route>
        <Route path="/mobileCovers/realme">
          <Product
            pageTitle={"Mobile Covers"}
            location={location}
            brand={brand}
            path={path}
            products={products}
            setProducts={setProducts}
            productType={"Mobile Covers"}
          />
        </Route>
        <Route path="/mobileCovers/vivo">
          <Product
            pageTitle={"Mobile Covers"}
            location={location}
            brand={brand}
            path={path}
            products={products}
            setProducts={setProducts}
            productType={"Mobile Covers"}
          />
        </Route>
        <Route path="/mobileCovers/xiaomi">
          <Product
            pageTitle={"Mobile Covers"}
            location={location}
            brand={brand}
            path={path}
            products={products}
            setProducts={setProducts}
            productType={"Mobile Covers"}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default MobileCovers;
