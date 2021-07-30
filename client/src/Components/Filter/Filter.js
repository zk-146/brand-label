import React, { useEffect, useState } from "react";
import getProducts from "../Fetch/Product/getProducts";
import "./Filter.css";

function Filter({
  // productsFilter,
  // setProductsFilter,
  // priceFilter,
  // setPriceFilter,
  // page,
  setProducts,
  products,
  brand,
  path,
  setLoading,
  productType,
  mobileFilter,
}) {
  const [mobileCovers] = useState([
    {
      brand: "iPhone",
      modelName: "iPhone 12 Pro",
    },
    {
      brand: "iPhone",
      modelName: "iPhone 12",
    },
    {
      brand: "iPhone",
      modelName: "iPhone 11 Pro",
    },
    {
      brand: "iPhone",
      modelName: "iPhone 11 Pro Max",
    },
    {
      brand: "iPhone",
      modelName: "iPhone 11",
    },
    {
      brand: "iPhone",
      modelName: "iPhone XR",
    },
    {
      brand: "iPhone",
      modelName: "iPhone X",
    },
    {
      brand: "Samsung",
      modelName: "Samsung Galaxy S21",
    },
    {
      brand: "Samsung",
      modelName: "Samsung Galaxy S20",
    },
    {
      brand: "Samsung",
      modelName: "Samsung Galaxy Z",
    },
    {
      brand: "Samsung",
      modelName: "Samsung Galaxy Note 10 Lite",
    },
    {
      brand: "OnePlus",
      modelName: "OnePlus 8",
    },
    {
      brand: "OnePlus",
      modelName: "OnePlus 8 Pro",
    },
    {
      brand: "OnePlus",
      modelName: "OnePlus 8T",
    },
    {
      brand: "OnePlus",
      modelName: "OnePlus 7T Pro",
    },
  ]);
  const [mobileCoversShow, setMobileCoversShow] = useState([]);

  const [mobileCoverType] = useState([
    "Silicon Case",
    "Camera Protection Case",
    "Figura Series Case",
    "Mega Safe Cover",
    "Rainbow Silicone Case",
    "ShockProof Case",
    "Silicone Case",
    "Slim Silicone",
    "Transparent Case",
  ]);

  const [airpodCovers] = useState(["Silicone Case", "Leather Case"]);

  const [smartWatches] = useState([
    "Magnetic Leather Loop",
    "Milanese Loop",
    "Nike Sport Band",
    "Silicone Sport Band",
    "Solo Nylon Loop",
    "Solo Silicone Loop",
    "TPU Case With Nylon Strap",
  ]);

  const [isChecked, setIsChecked] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedType, setSelectedType] = useState("");
  // const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  let pathname = window.location.pathname;
  pathname = pathname.split("/");
  pathname = pathname[pathname.length - 1];
  if (
    pathname === "mobileCovers" ||
    pathname === "airpodCovers" ||
    pathname === "smartwatches" ||
    pathname === "temperedGlasses"
  )
    pathname = "";

  useEffect(() => {
    const displayProduct = false;
    let tempMobileCases = [];

    mobileCovers.map((data, index) => {
      if (data.brand.toLowerCase() === brand) return tempMobileCases.push(data);
      return 0;
    });
    setMobileCoversShow(tempMobileCases);

    let pathname = window.location.pathname;
    pathname = pathname.split("/");
    pathname = pathname[pathname.length - 1];
    if (
      pathname === "mobileCovers" ||
      pathname === "airpodCovers" ||
      pathname === "smartwatches" ||
      pathname === "temperedGlasses"
    )
      pathname = "";
    const fetchProducts = async () => {
      setLoading(true);
      await getProducts(
        pathname,
        setProducts,
        productType,
        selectedModel,
        selectedType,
        selectedStyle,
        displayProduct
      );
      setLoading(false);
    };
    fetchProducts();
  }, [
    brand,
    selectedModel,
    isChecked,
    productType,
    setLoading,
    setProducts,
    selectedType,
    selectedStyle,
    mobileCovers,
  ]);

  const width = window.innerWidth;

  if (path.includes("mobileCovers"))
    return (
      <div
        className="sidebar"
        style={
          !mobileFilter && width < 585
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <div className="sidebar__container">
          <div className="sidebar__containerFilter">
            <div className="sidebar__prices">
              <p>Model</p>
              {pathname === ""
                ? mobileCovers.map((data, index) => {
                    return (
                      <div
                        className="sidebar__price sidebar__filter"
                        key={index + data.modelName}
                      >
                        <label>
                          <input
                            className="price__check customCheckbox"
                            type="radio"
                            name="filterModel"
                            id={"filterModel" + index}
                            value={data.modelName}
                            onClick={(event) => {
                              if (event.target.checked) {
                                for (let i = 0; i < mobileCovers.length; i++) {
                                  document.getElementById(
                                    "filterModel" + i
                                  ).checked = false;
                                }
                                setSelectedModel("");
                              }
                            }}
                            onChange={(event) => {
                              setIsChecked(!isChecked);
                              document.getElementById(
                                "filterModel" + index
                              ).checked = true;
                              setSelectedModel(event.target.value);
                            }}
                          />
                          {data.modelName}
                        </label>
                      </div>
                    );
                  })
                : mobileCoversShow.map((data, index) => {
                    return (
                      <div
                        className="sidebar__price sidebar__filter"
                        key={index + data.modelName}
                      >
                        <label>
                          <input
                            className="price__check customCheckbox"
                            type="radio"
                            name="filterModel"
                            id={"filterModel" + index}
                            value={data.modelName}
                            onClick={(event) => {
                              if (event.target.checked) {
                                for (
                                  let i = 0;
                                  i < mobileCoversShow.length;
                                  i++
                                ) {
                                  document.getElementById(
                                    "filterModel" + i
                                  ).checked = false;
                                }
                                setSelectedModel("");
                              }
                            }}
                            onChange={(event) => {
                              setIsChecked(!isChecked);
                              document.getElementById(
                                "filterModel" + index
                              ).checked = true;
                              setSelectedModel(event.target.value);
                            }}
                          />
                          {data.modelName}
                        </label>
                      </div>
                    );
                  })}
            </div>
            <div className="sidebar__prices">
              <p>Cover Type</p>
              {mobileCoverType.map((data, index) => {
                return (
                  <div
                    className="sidebar__price sidebar__filter"
                    key={index + data}
                  >
                    <label>
                      <input
                        className="price__check customCheckbox"
                        id={"filterType" + index}
                        type="radio"
                        name="filterType"
                        value={data}
                        onClick={(event) => {
                          if (event.target.checked) {
                            for (let i = 0; i < mobileCoverType.length; i++) {
                              document.getElementById(
                                "filterType" + i
                              ).checked = false;
                            }
                            setSelectedType("");
                          }
                        }}
                        onChange={(event) => {
                          setIsChecked(!isChecked);
                          document.getElementById(
                            "filterType" + index
                          ).checked = true;
                          setSelectedType(event.target.value);
                        }}
                      />
                      {data}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  else if (path.includes("airpodCovers"))
    return (
      <div
        className="sidebar"
        style={
          !mobileFilter && width < 585
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <div className="sidebar__container">
          <div className="sidebar__containerFilter">
            <div className="sidebar__prices">
              <p>Type</p>
              {pathname === ""
                ? airpodCovers.map((data, index) => {
                    return (
                      <div
                        className="sidebar__price sidebar__filter"
                        key={index + data}
                      >
                        <label>
                          <input
                            className="price__check customCheckbox"
                            id={"filterType" + index}
                            type="radio"
                            name="filterType"
                            value={data}
                            onClick={(event) => {
                              if (event.target.checked) {
                                for (let i = 0; i < airpodCovers.length; i++) {
                                  document.getElementById(
                                    "filterType" + i
                                  ).checked = false;
                                }
                                setSelectedType("");
                              }
                            }}
                            onChange={(event) => {
                              setIsChecked(!isChecked);
                              document.getElementById(
                                "filterType" + index
                              ).checked = true;
                              setSelectedType(event.target.value);
                            }}
                          />
                          {data}
                        </label>
                      </div>
                    );
                  })
                : airpodCovers.map((data, index) => {
                    return (
                      <div
                        className="sidebar__price sidebar__filter"
                        key={index + data}
                      >
                        <label>
                          <input
                            className="price__check customCheckbox"
                            id={"filterType" + index}
                            type="radio"
                            name="filterType"
                            value={data}
                            onClick={(event) => {
                              if (event.target.checked) {
                                for (let i = 0; i < airpodCovers.length; i++) {
                                  document.getElementById(
                                    "filterType" + i
                                  ).checked = false;
                                }
                                setSelectedType("");
                              }
                            }}
                            onChange={(event) => {
                              setIsChecked(!isChecked);
                              document.getElementById(
                                "filterType" + index
                              ).checked = true;
                              setSelectedType(event.target.value);
                            }}
                          />
                          {data}
                        </label>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    );
  else if (path.includes("smartwatches"))
    return (
      <div
        className="sidebar"
        style={
          !mobileFilter && width < 585
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <div className="sidebar__container">
          <div className="sidebar__containerFilter">
            <div className="sidebar__prices">
              <p>Style</p>
              {pathname === ""
                ? smartWatches.map((data, index) => {
                    return (
                      <div
                        className="sidebar__price sidebar__filter"
                        key={index + data}
                      >
                        <label>
                          <input
                            className="price__check customCheckbox"
                            id={"filterType" + index}
                            type="radio"
                            name="filterModel"
                            value={data}
                            onClick={(event) => {
                              if (event.target.checked) {
                                for (let i = 0; i < smartWatches.length; i++) {
                                  document.getElementById(
                                    "filterType" + i
                                  ).checked = false;
                                }
                                setSelectedStyle("");
                              }
                            }}
                            onChange={(event) => {
                              setIsChecked(!isChecked);
                              document.getElementById(
                                "filterType" + index
                              ).checked = true;
                              setSelectedStyle(event.target.value);
                            }}
                          />
                          {data}
                        </label>
                      </div>
                    );
                  })
                : smartWatches.map((data, index) => {
                    return (
                      <div
                        className="sidebar__price sidebar__filter"
                        key={index + data}
                      >
                        <label>
                          <input
                            className="price__check customCheckbox"
                            id={"filterType" + index}
                            type="radio"
                            name="filterModel"
                            value={data}
                            onClick={(event) => {
                              if (event.target.checked) {
                                for (let i = 0; i < smartWatches.length; i++) {
                                  document.getElementById(
                                    "filterType" + i
                                  ).checked = false;
                                }
                                setSelectedStyle("");
                              }
                            }}
                            onChange={(event) => {
                              setIsChecked(!isChecked);
                              document.getElementById(
                                "filterType" + index
                              ).checked = true;
                              setSelectedStyle(event.target.value);
                            }}
                          />
                          {data}
                        </label>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    );
  else if (path.includes("temperedGlasses"))
    return (
      <div
        className="sidebar"
        style={
          !mobileFilter && width < 585
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <div className="sidebar__container">
          <div className="sidebar__containerFilter">
            <div className="sidebar__prices">
              <p>Model</p>
              {pathname === ""
                ? mobileCovers.map((data, index) => {
                    return (
                      <div
                        className="sidebar__price sidebar__filter"
                        key={index + data.modelName}
                      >
                        <label>
                          <input
                            className="price__check customCheckbox"
                            id={"filterType" + index}
                            type="radio"
                            name="filterModel"
                            value={data.modelName}
                            onClick={(event) => {
                              if (event.target.checked) {
                                for (let i = 0; i < mobileCovers.length; i++) {
                                  document.getElementById(
                                    "filterType" + i
                                  ).checked = false;
                                }
                                setSelectedModel("");
                              }
                            }}
                            onChange={(event) => {
                              setIsChecked(!isChecked);
                              document.getElementById(
                                "filterType" + index
                              ).checked = true;
                              setSelectedModel(event.target.value);
                            }}
                          />
                          {data.modelName}
                        </label>
                      </div>
                    );
                  })
                : mobileCoversShow.map((data, index) => {
                    return (
                      <div
                        className="sidebar__price sidebar__filter"
                        key={index + data.modelName}
                      >
                        <label>
                          <input
                            className="price__check customCheckbox"
                            id={"filterType" + index}
                            type="radio"
                            name="filterModel"
                            value={data.modelName}
                            onClick={(event) => {
                              if (event.target.checked) {
                                for (
                                  let i = 0;
                                  i < mobileCoversShow.length;
                                  i++
                                ) {
                                  document.getElementById(
                                    "filterType" + i
                                  ).checked = false;
                                }
                                setSelectedModel("");
                              }
                            }}
                            onChange={(event) => {
                              setIsChecked(!isChecked);
                              document.getElementById(
                                "filterType" + index
                              ).checked = true;
                              setSelectedModel(event.target.value);
                            }}
                          />
                          {data.modelName}
                        </label>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Filter;
