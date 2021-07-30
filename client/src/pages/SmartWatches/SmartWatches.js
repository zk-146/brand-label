import "./SmartWatches.css";

import { Route, Switch, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import Product from "../../Components/Product/Product";

function SmartWatches() {
  let location = useLocation();
  const [brand, setBrand] = useState("");
  const [products, setProducts] = useState([]);
  const [path, setPath] = useState(location.pathname);
  const [loading, setLoading] = useState(false);
  const changeLoading = useCallback(() => {
    setLoading((l) => !l);
  }, [setLoading]);

  useEffect(() => {
    setPath(location.pathname);
    if (location.pathname === "/smartwatches/apple") {
      setBrand("apple");
    } else if (location.pathname === "/smartwatches/samsung") {
      setBrand("samsung");
    } else if (location.pathname === "/smartwatches/oneplus") {
      setBrand("oneplus");
    } else if (location.pathname === "/smartwatches/oppo") {
      setBrand("oppo");
    } else if (location.pathname === "/smartwatches/realme") {
      setBrand("realme");
    } else if (location.pathname === "/smartwatches/vivo") {
      setBrand("vivo");
    } else if (location.pathname === "/smartwatches/xiaomi") {
      setBrand("xiaomi");
    } else if (location.pathname === "/smartwatches") {
      setBrand("");
    }
  }, [location, brand, path]);

  return (
    <div>
      {location.pathname === "/smartwatches" ? (
        <Product
          pageTitle={"Smart Watch"}
          brand={brand}
          path={path}
          loading={loading}
          products={products}
          setProducts={setProducts}
          setLoading={setLoading}
          changeLoading={changeLoading}
          productType={"Smart Watch"}
        />
      ) : (
        <div></div>
      )}
      <Switch>
        <Route path="/smartwatches/apple">
          <Product
            pageTitle={"Smart Watch"}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Smart Watch"}
          />
        </Route>
        <Route path="/smartwatches/samsung">
          <Product
            pageTitle={"Smart Watch"}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Smart Watch"}
          />
        </Route>
        <Route path="/smartwatches/oneplus">
          <Product
            pageTitle={"Smart Watch"}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Smart Watch"}
          />
        </Route>
        <Route path="/smartwatches/oppo">
          <Product
            pageTitle={"Smart Watch"}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Smart Watch"}
          />
        </Route>
        <Route path="/smartwatches/xiaomi">
          <Product
            pageTitle={"Smart Watch"}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Smart Watch"}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default SmartWatches;
