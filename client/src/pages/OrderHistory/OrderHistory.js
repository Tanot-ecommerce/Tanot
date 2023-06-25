import React from "react";
import ProductsData from "../../data/ProductsData"; // Assuming ProductsData.js contains the product information

const OrderHistory = () => {
    return (
        <div className="order-history bg-gray-100 py-6">
            <div className="order-history-container mx-auto max-w-xl px-4">
                <div className="order-history-header mb-8">
                    <h2 className="text-2xl font-bold">Order History</h2>
                </div>
                <div className="order-history-body grid grid-cols-2 gap-6">
                    {ProductsData.map((product, index) => (
                        <div
                            className="order-history-item bg-white rounded-lg shadow-md p-6"
                            key={index}
                        >
                            <div className="order-history-item-header mb-4">
                                <div className="order-history-item-header-left">
                                    <h3 className="text-lg font-bold">
                                        Order #{product.orderNumber}
                                    </h3>
                                    <p className="text-gray-600">
                                        Placed on {product.orderDate}
                                    </p>
                                </div>
                                <div className="order-history-item-header-right">
                                    <p className="text-gray-600">
                                        Total: ${product.totalPrice}
                                    </p>
                                </div>
                            </div>
                            <div className="order-history-item-body flex items-center">
                                <div className="order-history-item-body-left">
                                    <img
                                        src={product.image}
                                        alt="Product"
                                        className="w-20 h-20 object-full"
                                    />
                                </div>
                                <div className="order-history-item-body-right ml-4">
                                    <h3 className="text-lg font-bold">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        Price: ${product.price}
                                    </p>
                                    <p className="text-gray-600">
                                        Quantity: {product.quantity}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
