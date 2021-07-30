import "./AddBrands.css";

import React, { useState } from "react";

import Dropdown from "react-dropdown";
import axios from "../../axios";

function AddBrands() {
  const options = [
    "Mobile Covers",
    "Airpod Cases",
    "Smart Watch",
    "Tempered Glass",
  ];
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");

  const [uploaded, setUploaded] = useState(false);

  const fetchOptions = async (event) => {
    event.preventDefault();
    const fetchData = await axios.post("/addbrands", {
      productType,
      productName,
      brand,
    });
    setUploaded(true);
    productUploadedTime();
    console.log(fetchData.data);
  };

  const productUploadedTime = () => {
    setTimeout(() => {
      setUploaded(false);
    }, 15000);
  };

  return (
    <div className="addbrands">
      <div className="addbrands__container">
        <p className="header pageHeader">Add Brands</p>
        <hr />
        <div className="addbrands__functions">
          <div className="addbrands__function">
            <Dropdown
              className="dropdown__menu"
              options={options}
              placeholder="Select Type..."
              value={productType}
              onChange={(event) => setProductType(event.value)}
            />
          </div>
          <input
            className="addbrands__function form__input"
            type="text"
            value={brand}
            placeholder="Brand"
            onChange={(event) => {
              setBrand(event.target.value.toLowerCase());
            }}
          />
          <input
            className="addbrands__function form__input"
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(event) => {
              setProductName(event.target.value);
            }}
          />
          {uploaded ? (
            <div className="create__productUploaded">Uploaded!</div>
          ) : (
            <div></div>
          )}
          <input
            type="button"
            className="btn addbrands__btn"
            value="Submit"
            onClick={(event) => fetchOptions(event)}
          />
        </div>
      </div>
    </div>
  );
}

export default AddBrands;
