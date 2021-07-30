import "./Carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom";
import React from "react";
import Slider from "react-slick";

function Carousel({ carouselData }) {
  // const STY = {
  //   paddingTop: "50px",
  // };

  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    className: "slides",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        {carouselData.map((data, index) => (
          <div style={{ alignItems: "center" }} key={data.url}>
            <Link to={data.url}>
              <img
                src={data.image}
                alt=""
                className="images"
                // width="100px"
                // height="250px"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
