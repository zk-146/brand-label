import React from "react";
import { Link } from "react-router-dom";
import "./MobileCoverDropdown.css";

function MobileCoverDropdown() {
  return (
    <div className="mobilecoverdropdown">
      <div className="mobilecoverdropdown__container">
        <div className="dropdown__options">
          {/* <div className="dropdown__row"> */}
          {/* <div className="dropdown__section dropdown__cell"> */}
          <Link className="link dropdown__link" to="/mobileCovers/iphone">
            <div className="dropdown__sectionsHeader">iPhone</div>
          </Link>
          {/* </div> */}
          {/* <div className="dropdown__section dropdown__cell"> */}
          <Link className="link dropdown__link" to="/mobileCovers/samsung">
            <div className="dropdown__sectionsHeader">Samsung</div>
          </Link>
          {/* </div> */}
          {/* <div className="dropdown__section dropdown__cell"> */}
          <Link className="link dropdown__link" to="/mobileCovers/oneplus">
            <div className="dropdown__sectionsHeader">OnePlus+</div>
          </Link>
          {/* </div> */}
          {/* <div className="dropdown__section dropdown__cell"> */}
          <Link className="link dropdown__link" to="/mobileCovers/oppo">
            <div className="dropdown__sectionsHeader">Oppo</div>
          </Link>
          {/* </div> */}
          {/* </div> */}
          {/* <div className="dropdown__row"> */}
          {/* <div className="dropdown__section dropdown__cell"> */}
          <Link className="link dropdown__link" to="/mobileCovers/realme">
            <div className="dropdown__sectionsHeader">Realme</div>
          </Link>
          {/* </div> */}
          {/* <div className="dropdown__section dropdown__cell"> */}
          <Link className="link dropdown__link" to="/mobileCovers/vivo">
            <div className="dropdown__sectionsHeader">Vivo</div>
          </Link>
          {/* </div> */}
          {/* <div className="dropdown__section dropdown__cell"> */}
          <Link className="link dropdown__link" to="/mobileCovers/xiaomi">
            <div className="dropdown__sectionsHeader">MI/Xiaomi</div>
          </Link>
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default MobileCoverDropdown;
