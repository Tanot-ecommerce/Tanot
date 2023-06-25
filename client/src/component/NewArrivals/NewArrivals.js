import React from "react";
import "./NewArrivals.css";
import ProductsData from "../../data/ProductsData";
import clsx from "clsx";

const NewArrivals = () => {
    return (
        <div className="new-arrivals text-center py-6">
            <h2 className="text-4xl label-arial text-center my-6 custom-title">
                Upcoming <span>Collections</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
                {ProductsData.map((product) => (
                    <div
                        key={product.id}
                        className={clsx(
                            "product-item border rounded-lg border-gray-300 p-4 text-center",
                            {
                                "md:col-span-1": true,
                                "md:mb-0": true,
                                "mb-6": false,
                            }
                        )}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-image w-full max-h-48 object-full mb-3"
                        />
                        <h3 className="product-name text-lg font-bold mb-2">
                            {product.name}
                        </h3>
                        <p className="product-price">Price: {product.price}</p>
                        <button className="cart-button">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;
