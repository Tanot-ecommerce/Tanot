import React from "react";
import ProductsData from "../../data/ProductsData";
import "./NewArrivals.css";

const NewArrivals = () => {
  return (
    <div className="new-arrivals">
      <h2 className="section-title">New Arrivals</h2>
      <div className="products-container">
        {ProductsData.map((product) => (
          <div key={product.id} className="product-item">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">Price: {product.price}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
