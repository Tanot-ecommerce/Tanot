import React, { useState } from "react";
import "./BestSellers.css";
import { LeftSliderArrow, RightSliderArrow } from "../../utils/assets/svg";
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
        <section className="best-sellers-container py-6">
            <h2 className="text-4xl label-arial text-center text-white my-6">
                Best <span>Collections</span>
            </h2>
            <div className="flex items-center justify-between">
                <div
                    className="slider-arrow cursor-pointer left-4"
                    onClick={handlePreviousSlide}
                >
                    <LeftSliderArrow />
                </div>
                <div className="best-sellers-list py-8 flex gap-4">
                    {visibleProducts.map((product) => (
                        <div
                            key={product.id}
                            className="best-sellers-product-item bg-white rounded-lg shadow-md flex flex-col justify-between"
                        >
                            <div className="w-full h-96">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="object-full rounded-lg w-full h-full"
                                />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-bold mb-2">
                                    {product.title}
                                </h3>
                                <p className="text-gray-600">
                                    Price: {product.price}
                                </p>
                            </div>
                            <div className="mt-4 space-x-2 p-4">
                                <button className="shop-button text-white font-bold py-2 px-4 rounded">
                                    Buy Now
                                </button>
                                <button className="cart-button  text-white font-bold py-2 px-4 rounded">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className="slider-arrow cursor-pointer"
                    onClick={handleNextSlide}
                >
                    <RightSliderArrow />
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
