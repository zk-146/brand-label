import React from "react";
import "./Dots.css";
import { ImageData } from "./ImageData";

const Dots = (props) => {
  return (
    <div className="all-dots">
      {ImageData.map((slide, index) => (
        <span
          key={index}
          className={`${props.current === index ? "dot active-dot" : "dot"}`}
          onClick={(event) => props.onClick((event.target.value = index))}
        ></span>
      ))}
    </div>
  );
};

export default Dots;
