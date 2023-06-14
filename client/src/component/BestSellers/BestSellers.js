import React, { useState } from "react";
import { LeftSliderArrow, RightSliderArrow } from "../../utils/assets/svg";
import "./BestSellers.css";
import ProductsData from "../../data/ProductsData";

const BestSellers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? ProductsData.length - 3 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide >= ProductsData.length - 3 ? 0 : prevSlide + 1
    );
  };

  const visibleProducts = ProductsData.slice(currentSlide, currentSlide + 3);

  return (
    <section className="best-sellers">
      <h2 className="best-sellers-section-title">Best Sellers</h2>
      <div className="slider-container">
        <div
          className="slider-arrow slider-arrow-left"
          onClick={handlePreviousSlide}
        >
          <LeftSliderArrow />
        </div>
        <div className="product-list">
          {visibleProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <span className="product-price">Price: {product.price}</span>
              <div className="product-actions">
                <button className="btn-add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        <div
          className="slider-arrow slider-arrow-right"
          onClick={handleNextSlide}
        >
          <RightSliderArrow />
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
