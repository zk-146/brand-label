import "./Edit.css";

import {
  mrpChange,
  priceChange,
  quantityChange,
} from "../../helpers/valueChanges";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import Button from "../../Components/Button/Button";
import Dropdown from "react-dropdown";
import InputText from "../../Components/Input/InputText";
import InputTextArea from "../../Components/Input/InputTextArea";
import ProductCard from "../../Components/ProductCard/ProductCard";
import getBrands from "../../helpers/getBrands";
import getProduct from "../../helpers/getProduct";
import handleProductDelete from "../../helpers/handleDelete-product";
import handleSubmitEdit from "../../helpers/handleSubmit-edit";

function Edit() {
  const { id } = useParams();
  const options = [
    "Mobile Cover",
    "Airpod Cases",
    "Smart Watch",
    "Tempered Glass",
  ];

  const history = useHistory();

  const [productNames, setProductNames] = useState([]);
  const [brands, setBrands] = useState([]);

  const [brand, setBrand] = useState("");
  const [productType, setProductType] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [smartWatchStyle, setSmartWatchStyle] = useState("");
  const [displayUrl, setDisplayUrl] = useState("");

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
  const [displayProduct, setDisplayProduct] = useState("false");

  const displayProductOptions = ["true", "false"];

  const [productUploaded, setProductUploaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBrands(productType);
      let tempBrands = new Set();
      let tempProductNames = new Set();
      Object.keys(res).map((keys) => {
        tempBrands.add(res[keys].brand);
        tempProductNames.add(res[keys].name);
        return true;
      });
      let tempBrands1 = [...tempBrands];
      let tempProductNames1 = [...tempProductNames];
      setBrands(tempBrands1);
      setProductNames(tempProductNames1);
    };
    fetchData();
  }, [productType]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id);
      setProductType(data.data.productType);
      setName(data.data.name);
      setDescription(data.data.description);
      setSellingPrice(data.data.sellingPrice);
      setMrp(data.data.mrp);
      setColor(data.data.color);
      setQuantity(data.data.quantity);
      setBrand(data.data.brand);
      setProductName(data.data.productName);
      setMaterialType(data.data.materialType);
      setDisplayUrl(data.data.mediaUrl1);
      setDisplayProduct(() => {
        if (data.data.displayPage === true) {
          return "true";
        } else {
          return "false";
        }
      });
      let tempMediaUrls = [...mediaUrls];
      tempMediaUrls[0].url = data.data.mediaUrl1;
      tempMediaUrls[1].url = data.data.mediaUrl2;
      tempMediaUrls[2].url = data.data.mediaUrl3;
      tempMediaUrls[3].url = data.data.mediaUrl4;
      tempMediaUrls[4].url = data.data.mediaUrl5;
      setMediaUrls(tempMediaUrls);
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async (event) => {
    event.preventDefault();
    const res = await handleProductDelete(id);
    if (res === 200) {
      history.push("/");
    }
  };

  const handleCancel = async (event) => {
    event.preventDefault();
    history.push("/");
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
                <InputText value={name} setValue={setName} />
              </div>
              <div className="create__price">
                <InputText value={color} setValue={setColor} />
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
                <InputTextArea value={description} setValue={setDescription} />
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
                  setDisplayProduct(event.value);
                }}
              />
            </form>
            <div className="edit__btns">
              <Button
                value="Delete Product"
                customClass="btn-create btn-red"
                handleClick={handleDelete}
              />
              <Button
                value="Cancel"
                customClass="btn-create"
                handleClick={handleCancel}
              />
              <Button
                value="Save Changes"
                customClass="btn-create btn-green"
                handleClick={() => {
                  handleSubmitEdit(
                    mediaUrls,
                    setMediaUrls,
                    medias,
                    setProductUploaded,
                    productUploadedTime,
                    id,
                    productType,
                    name,
                    sellingPrice,
                    description,
                    mrp,
                    color,
                    smartWatchStyle,
                    quantity,
                    displayProduct,
                    materialType,
                    brand,
                    productName
                  );
                }}
              />
            </div>
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
                      Change Image {index + 1}
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
                mediaUrl={displayUrl}
                productQuantity={quantity}
                media={medias[0].cardImage}
                mrp={mrp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
