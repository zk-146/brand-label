import { Route, Switch, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import Product from "../../Components/Product/Product";

function TemperedGlasses() {
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
    if (location.pathname === "/temperedGlasses/iphone") {
      setBrand("iphone");
    } else if (location.pathname === "/temperedGlasses/samsung") {
      setBrand("samsung");
    } else if (location.pathname === "/temperedGlasses/oneplus") {
      setBrand("oneplus");
    } else if (location.pathname === "/temperedGlasses/oppo") {
      setBrand("oppo");
    } else if (location.pathname === "/temperedGlasses/realme") {
      setBrand("realme");
    } else if (location.pathname === "/temperedGlasses/vivo") {
      setBrand("vivo");
    } else if (location.pathname === "/temperedGlasses/xiaomi") {
      setBrand("xiaomi");
    } else if (location.pathname === "/temperedGlasses") {
      setBrand("");
    }
  }, [location, brand, path]);

  return (
    <div>
      {location.pathname === "/temperedGlasses" ? (
        <Product
          pageTitle={"Tempered Glass"}
          location={location}
          brand={brand}
          path={path}
          loading={loading}
          products={products}
          setProducts={setProducts}
          setLoading={setLoading}
          changeLoading={changeLoading}
          productType={"Tempered Glass"}
        />
      ) : (
        <div></div>
      )}
      <Switch>
        <Route path="/temperedGlasses/iphone">
          <Product
            pageTitle={"Tempered Glass"}
            location={location}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Tempered Glass"}
          />
        </Route>
        <Route path="/temperedGlasses/samsung">
          <Product
            pageTitle={"Tempered Glass"}
            location={location}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Tempered Glass"}
          />
        </Route>
        <Route path="/temperedGlasses/oneplus">
          <Product
            pageTitle={"Tempered Glass"}
            location={location}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Tempered Glass"}
          />
        </Route>
        <Route path="/temperedGlasses/oppo">
          <Product
            pageTitle={"Tempered Glass"}
            location={location}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Tempered Glass"}
          />
        </Route>
        <Route path="/temperedGlasses/realme">
          <Product
            pageTitle={"Tempered Glass"}
            location={location}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Tempered Glass"}
          />
        </Route>
        <Route path="/temperedGlasses/vivo">
          <Product
            pageTitle={"Tempered Glass"}
            location={location}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Tempered Glass"}
          />
        </Route>
        <Route path="/temperedGlasses/xiaomi">
          <Product
            pageTitle={"Tempered Glass"}
            location={location}
            brand={brand}
            path={path}
            loading={loading}
            products={products}
            setProducts={setProducts}
            setLoading={setLoading}
            changeLoading={changeLoading}
            productType={"Tempered Glass"}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default TemperedGlasses;
