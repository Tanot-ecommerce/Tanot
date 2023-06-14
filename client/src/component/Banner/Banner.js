import React, { useState } from "react";
import "./Banner.css";
import { LeftSliderArrow, RightSliderArrow } from "../../utils/assets/svg";
import banner1 from "../../Images/banner1.png";
import banner2 from "../../Images/banner2.png";
import banner3 from "../../Images/banner3.png";

const Banner = () => {
  const images = [banner1, banner2, banner3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="banner">
      <div className="banner-arrow banner-left" onClick={goToPrevious}>
        <LeftSliderArrow />
      </div>
      <img src={images[currentIndex]} alt="" />
      <div className="banner-arrow banner-right" onClick={goToNext}>
        <RightSliderArrow />
      </div>
      <div className="banner-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`banner-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
