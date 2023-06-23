import React from "react";
import clsx from "clsx";
import ProductsData from "../../data/ProductsData";

const WishList = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Wish List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ProductsData.map((product) => (
                    <div
                        key={product.id}
                        className={clsx("bg-white rounded-lg shadow-md p-4", {
                            "sm:col-span-1 lg:col-span-2":
                                ProductsData.length >= 2,
                        })}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-full mb-2"
                        />
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-gray-600">{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishList;
