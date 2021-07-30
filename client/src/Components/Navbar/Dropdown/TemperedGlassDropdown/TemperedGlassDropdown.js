import React from "react";
import { Link } from "react-router-dom";
import "./TemperedGlassDropdown.css";

function TemperedGlassDropdown() {
  return (
    <div className="temperedglassdropdown">
      <div className="temperedglassdropdown__container">
        <div className="dropdown__options">
          <Link className="link dropdown__link" to="/temperedGlasses/iphone">
            <div className="dropdown__sectionsHeader">iPhone</div>
          </Link>

          <Link className="link dropdown__link" to="/temperedGlasses/samsung">
            <div className="dropdown__sectionsHeader">Samsung</div>
          </Link>

          <Link className="link dropdown__link" to="/temperedGlasses/oneplus">
            <div className="dropdown__sectionsHeader">OnePlus+</div>
          </Link>

          <Link className="link dropdown__link" to="/temperedGlasses/oppo">
            <div className="dropdown__sectionsHeader">Oppo</div>
          </Link>

          <Link className="link dropdown__link" to="/temperedGlasses/realme">
            <div className="dropdown__sectionsHeader">Realme</div>
          </Link>

          <Link className="link dropdown__link" to="/temperedGlasses/vivo">
            <div className="dropdown__sectionsHeader">Vivo</div>
          </Link>

          <Link className="link dropdown__link" to="/temperedGlasses/xiaomi">
            <div className="dropdown__sectionsHeader">MI/Xiaomi</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TemperedGlassDropdown;
