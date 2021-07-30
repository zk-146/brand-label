import { useState } from "react";
import "./MobileFilter.css";

function MobileFilter() {
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

  const [selectedModel, setSelectedModel] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const width = window.innerWidth;

  if (width > "768px") {
    return null;
  }

  return (
    <div className="mobileFilter">
      <div className="mobileFilter__container">
        <div className="mobileFilter__options">
          <p className="mobileFilter__optionsHeader">Model</p>
          {mobileCovers.map((data, index) => {
            return (
              <div className="mobileFilter__option" key={data + index}>
                <label>
                  <input
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
          })}
        </div>
      </div>
    </div>
  );
}

export default MobileFilter;
