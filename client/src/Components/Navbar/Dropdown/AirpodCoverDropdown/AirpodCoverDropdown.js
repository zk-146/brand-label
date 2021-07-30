import React from "react";
import { Link } from "react-router-dom";
import "./AirpodCoverDropdown.css";

function AppleDropdown() {
  return (
    <div className="airpodcoverdropdown">
      <div className="airpodcoverdropdown__container">
        <div className="dropdown__options">
          <Link className="link dropdown__link" to="/airpodCovers/apple">
            <div className="dropdown__sectionsHeader">Apple</div>
          </Link>

          <Link className="link dropdown__link" to="/airpodCovers/oneplus">
            <div className="dropdown__sectionsHeader">Oneplus+</div>
          </Link>

          <Link className="link dropdown__link" to="/airpodCovers/samsung">
            <div className="dropdown__sectionsHeader">Samsung</div>
          </Link>

          <Link className="link dropdown__link" to="/airpodCovers/oppo">
            <div className="dropdown__sectionsHeader">Oppo</div>
          </Link>

          <Link className="link dropdown__link" to="/airpodCovers/xiaomi">
            <div className="dropdown__sectionsHeader">MI/Xiaomi</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AppleDropdown;
