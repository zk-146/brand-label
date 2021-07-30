import "./Home.css";

import Carousel from "../../Components/Carousel/Carousel";
import DisplayProducts from "../../Components/DisplayProducts/DisplayProducts";
import { ImageData } from "../../Components/ImageSlider/ImageData";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import { airpods } from "../../Components/Carousel/airpods";
import { mobiles } from "../../Components/Carousel/mobiles";
import { smartwatches } from "../../Components/Carousel/smartwatches";

function Home() {
  const shopFor = ["Mobile Covers", "Airpod Cases", "Watch Straps"];
  // const shopFor = ["Mobile Covers", "Airpod Cases"];

  const displayProduct = ["iPhone Covers", "Airpod Cases"];
  // const displayProduct = ["iPhone Covers", "Airpod Cases", "Watch Straps"];

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__lightningDeal">
          <ImageSlider slides={ImageData} />
        </div>
        <hr className="home__hr" />

        <div className="home__displayProducts">
          {displayProduct.map((data, index) => {
            return (
              <div className="home__displayProductsContent" key={data + index}>
                <h3 className="home__displayProductsContentHeader header">
                  {data}
                </h3>
                <DisplayProducts type={data} />
              </div>
            );
          })}
        </div>

        {shopFor.map((data, index) => {
          let carouselData = [];
          if (data === "Mobile Covers") carouselData = mobiles;
          if (data === "Airpod Cases") carouselData = airpods;
          if (data === "Watch Straps") carouselData = smartwatches;
          return (
            <div className="home__shopFor" key={shopFor + index}>
              <h3 className="home__shopForHeader header">{data}</h3>
              <div className="home__lightningDealProducts">
                <Carousel carouselData={carouselData} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
