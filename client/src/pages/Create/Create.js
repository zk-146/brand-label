import "./Create.css";

import {
  mrpChange,
  priceChange,
  quantityChange,
} from "../../helpers/valueChanges";
import { useEffect, useState } from "react";

import Dropdown from "react-dropdown";
import ProductCard from "../../Components/ProductCard/ProductCard";
import axios from "../../axios";
import { imageUpload } from "../../helpers/imageUpload";

const Create = () => {
  const options = [
    "Mobile Cover",
    "Airpod Cases",
    "Smart Watch",
    "Tempered Glass",
  ];

  const [productNames, setProductNames] = useState([]);
  const [brands, setBrands] = useState([]);

  const [brand, setBrand] = useState("");
  const [productType, setProductType] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [smartWatchStyle, setSmartWatchStyle] = useState("");
  const mobileMaterialTypeOption = [
    "Silicon Case",
    "Camera Protection Case",
    "Figura Series Case",
    "Mega Safe Cover",
    "Rainbow Silicone Case",
    "ShockProof Case",
    "Silicone Case",
    "Slim Silicone",
    "Transparent Case",
  ];
  const airpodMaterialTypeOption = ["Silicone Case", "Leather Case"];
  const smartWatchStyleOption = [
    "Magnetic Leather Loop",
    "Milanese Loop",
    "Nike Sport Band",
    "Silicone Sport Band",
    "Solo Nylon Loop",
    "Solo Silicone Loop",
    "TPU Case With Nylon Strap",
  ];
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [medias, setMedias] = useState([
    {
      id: 1,
      media: "",
      cardImage: "",
    },
    {
      id: 2,
      media: "",
    },
    {
      id: 3,
      media: "",
    },
    {
      id: 4,
      media: "",
    },
    {
      id: 5,
      media: "",
    },
  ]);
  const [color, setColor] = useState("");
  const [mediaUrls, setMediaUrls] = useState([
    {
      id: 1,
      url: "",
    },
    {
      id: 2,
      url: "",
    },
    {
      id: 3,
      url: "",
    },
    {
      id: 4,
      url: "",
    },
    {
      id: 5,
      url: "",
    },
  ]);

  const [quantity, setQuantity] = useState(0);
  const [displayProduct, setDisplayProduct] = useState(false);

  const displayProductOptions = ["true", "false"];

  const [productUploaded, setProductUploaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/addbrands", {
        params: { productType: productType },
      });
      console.log(res);
      const res2 = res.data;
      let tempBrands = new Set();
      let tempProductNames = new Set();
      Object.keys(res2).map((keys) => {
        tempBrands.add(res2[keys].brand);
        tempProductNames.add(res2[keys].name);
        return true;
      });
      let tempBrands1 = [...tempBrands];
      let tempProductNames1 = [...tempProductNames];
      setBrands(tempBrands1);
      setProductNames(tempProductNames1);
    };
    fetchData();
  }, [productType]);

  const handleMediaUrls = async (mediaUrl, index) => {
    let tempMediaUrls = [...mediaUrls];
    tempMediaUrls[index].url = mediaUrl;
    setMediaUrls(tempMediaUrls);
  };

  const handleSubmit = async () => {
    const imageUrl1 = await imageUpload(medias[0].media);
    handleMediaUrls(imageUrl1, 0);
    const imageUrl2 = await imageUpload(medias[1].media);
    handleMediaUrls(imageUrl2, 1);
    const imageUrl3 = await imageUpload(medias[2].media);
    handleMediaUrls(imageUrl3, 2);
    const imageUrl4 = await imageUpload(medias[3].media);
    handleMediaUrls(imageUrl4, 3);
    const imageUrl5 = await imageUpload(medias[4].media);
    handleMediaUrls(imageUrl5, 4);

    const res = await axios.post("/", {
      productType,
      name,
      sellingPrice,
      mrp,
      description,
      mediaUrl1: mediaUrls[0].url,
      mediaUrl2: mediaUrls[1].url,
      mediaUrl3: mediaUrls[2].url,
      mediaUrl4: mediaUrls[3].url,
      mediaUrl5: mediaUrls[4].url,
      color,
      quantity,
      brand,
      productName,
      displayProduct,
      materialType,
    });
    if (res.error) {
      console.log("ERROR:", res.error);
    } else {
      setProductUploaded(true);
      productUploadedTime();
    }
  };

  const productUploadedTime = () => {
    setTimeout(() => {
      setProductUploaded(false);
    }, 15000);
  };

  const changeMedia = (event, index) => {
    let tempMedias = [...medias];
    tempMedias[index].media = event.target.files[0];
    if (index === 0)
      tempMedias[index].cardImage = URL.createObjectURL(event.target.files[0]);
    console.log(medias[0].media);
    setMedias(tempMedias);
  };

  return (
    <div className="create">
      <div className="create__container">
        <div className="header pageHeader">Create</div>
        <hr />

        <div className="create__functions">
          <div className="create__functionsLeft">
            <form className="form">
              <Dropdown
                className="dropdown__menu"
                options={options}
                placeholder="Select Type..."
                value={productType}
                onChange={(event) => setProductType(event.value)}
              />

              <Dropdown
                className="dropdown__menu"
                options={brands}
                placeholder="Select Brand..."
                value={brand}
                onChange={(event) => {
                  setBrand(event.value);
                }}
              />
              <Dropdown
                className="dropdown__menu"
                options={productNames}
                placeholder="Select Model..."
                value={productName}
                onChange={(event) => {
                  setProductName(event.value);
                }}
              />

              {productType === "Mobile Cover" && (
                <Dropdown
                  className="dropdown__menu"
                  options={mobileMaterialTypeOption}
                  placeholder="Select Cover Type..."
                  value={materialType}
                  onChange={(event) => {
                    setMaterialType(event.value);
                  }}
                />
              )}
              {productType === "Airpod Cases" && (
                <Dropdown
                  className="dropdown__menu"
                  options={airpodMaterialTypeOption}
                  placeholder="Select Cover Type..."
                  value={materialType}
                  onChange={(event) => {
                    setMaterialType(event.value);
                  }}
                />
              )}
              {productType === "Smart Watch" && (
                <Dropdown
                  className="dropdown__menu"
                  options={smartWatchStyleOption}
                  placeholder="Select Cover Type..."
                  value={smartWatchStyle}
                  onChange={(event) => {
                    setSmartWatchStyle(event.value);
                  }}
                />
              )}

              <div className="create__name">
                <input
                  placeholder="Display Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  className=""
                  type="text"
                />
              </div>
              <div className="create__price">
                <input
                  placeholder="Color"
                  value={color}
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                  className=""
                  type="text"
                />
              </div>
              <div className="create__price">
                <input
                  placeholder="Price"
                  value={sellingPrice}
                  onChange={(event) => {
                    priceChange(event, setSellingPrice);
                  }}
                  className=""
                  type="text"
                />
              </div>
              <div className="create__price">
                <input
                  placeholder="MRP"
                  value={mrp}
                  onChange={(event) => {
                    mrpChange(event, setMrp);
                  }}
                  className=""
                  type="text"
                />
              </div>
              <div className="create__description">
                <textarea
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  rows="8"
                  placeholder="Description"
                  className="create__descriptionInput"
                  type="text"
                />
              </div>
              <div className="create__price">
                <input
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(event) => {
                    quantityChange(event, setQuantity);
                  }}
                  className=""
                  type="text"
                />
              </div>
              <Dropdown
                className="dropdown__menu"
                options={displayProductOptions}
                placeholder="Display on home page..."
                value={displayProduct}
                onChange={(event) => {
                  console.log(event.value);
                  setDisplayProduct(event.value);
                  console.log("displayProduct", displayProduct);
                }}
              />
            </form>
            <input
              className="btn btn-create"
              type="button"
              value="Create"
              onClick={(event) => {
                handleSubmit(event);
              }}
            />
            {productUploaded ? (
              <div className="create__productUploaded">
                Product Uploaded: {name}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="create__functionsRight">
            <div className="create__image">
              {medias.map((data, index) => {
                return (
                  <div key={index}>
                    <label htmlFor={`file${index}`} className="btn">
                      Upload Image {index + 1}
                    </label>
                    <input
                      id={`file${index}`}
                      className="create__imageFile"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        if (event.target.files[0]) {
                          changeMedia(event, index);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="create__preview">
              <p className="header previewHeader">Preview</p>
              <ProductCard
                color={color}
                name={name}
                description={description}
                price={sellingPrice}
                page="create"
                // media={cardImage}
                media={medias[0].cardImage}
                mrp={mrp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
