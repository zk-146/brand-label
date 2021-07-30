import React, { useState, useEffect } from "react";
import { ImageData } from "./ImageData";
import "./ImageSlider.css";
import Dots from "./Dots";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const ImageSlider = ({ slides }) => {
  const length = slides.length;
  const len = slides.length - 1;

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === len ? 0 : current + 1);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [current, len]);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <ArrowBackIosIcon
        style={{ fontSize: "2rem" }}
        className="left-arrow"
        onClick={prevSlide}
      />
      <ArrowForwardIosIcon
        style={{ fontSize: "2rem" }}
        className="right-arrow"
        onClick={nextSlide}
      />

      {ImageData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            <Link className="link" to={slide.path}>
              {index === current && (
                <img className="image" src={slide.image} alt="Some" />
              )}
            </Link>
          </div>
        );
      })}
      <Dots current={current} onClick={(current) => setCurrent(current)} />
    </section>
  );
};

export default ImageSlider;
