import React from "react";
import { Link } from "react-router-dom";
import "./SmartWatchesDropdown.css";

function AppleDropdown() {
  return (
    <div className="smartwatchesdropdown">
      <div className="smartwatchesdropdown__container">
        <div className="dropdown__options">
          <Link className="link dropdown__link" to="/smartwatches/apple">
            <div className="dropdown__sectionsHeader">Apple</div>
          </Link>
          <Link className="link dropdown__link" to="/smartwatches/oneplus">
            <div className="dropdown__sectionsHeader">Oneplus+</div>
          </Link>
          <Link className="link dropdown__link" to="/smartwatches/samsung">
            <div className="dropdown__sectionsHeader">Samsung</div>
          </Link>
          <Link className="link dropdown__link" to="/smartwatches/oppo">
            <div className="dropdown__sectionsHeader">Oppo</div>
          </Link>
          <Link className="link dropdown__link" to="/smartwatches/xiaomi">
            <div className="dropdown__sectionsHeader">MI/Xiaomi</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AppleDropdown;
