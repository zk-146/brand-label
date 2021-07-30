import "./AirpodCovers.css";

import { Route, Switch, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import Product from "../../Components/Product/Product";

function AirpodCovers() {
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
    if (location.pathname === "/airpodCovers/apple") {
      setBrand("apple");
    } else if (location.pathname === "/airpodCovers/samsung") {
      setBrand("samsung");
    } else if (location.pathname === "/airpodCovers/oneplus") {
      setBrand("oneplus");
    } else if (location.pathname === "/airpodCovers/oppo") {
      setBrand("oppo");
    } else if (location.pathname === "/airpodCovers/realme") {
      setBrand("realme");
    } else if (location.pathname === "/airpodCovers/vivo") {
      setBrand("vivo");
    } else if (location.pathname === "/airpodCovers/xiaomi") {
      setBrand("xiaomi");
    } else if (location.pathname === "/airpodCovers") {
      setBrand("");
    }
  }, [location, brand, path]);

  return (
    <div>
      {location.pathname === "/airpodCovers" ? (
        <Product
          pageTitle={"Airpod Covers"}
          location={location}
          brand={brand}
          path={path}
          loading={loading}
          products={products}
          setProducts={setProducts}
          setLoading={setLoading}
          changeLoading={changeLoading}
          productType={"Airpod Cases"}
        />
      ) : (
        <div></div>
      )}
      <Switch>
        <Route path="/airpodCovers/apple">
          <Product
            pageTitle={"Airpod Covers"}
            location={location}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Airpod Cases"}
          />
        </Route>
        <Route path="/airpodCovers/samsung">
          <Product
            pageTitle={"Airpod Covers"}
            location={location}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Airpod Cases"}
          />
        </Route>
        <Route path="/airpodCovers/oneplus">
          <Product
            pageTitle={"Airpod Covers"}
            location={location}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Airpod Cases"}
          />
        </Route>
        <Route path="/airpodCovers/oppo">
          <Product
            pageTitle={"Airpod Covers"}
            location={location}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Airpod Cases"}
          />
        </Route>
        <Route path="/airpodCovers/xiaomi">
          <Product
            pageTitle={"Airpod Covers"}
            location={location}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Airpod Cases"}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default AirpodCovers;
