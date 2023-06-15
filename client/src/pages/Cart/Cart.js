import React from "react";
import CartData from "../../data/CartData";

const Cart = () => {
    return (
        <div>
            {CartData.map((item) => (
                <div key={item.id}>
                    <img src={item.img} alt={item.title} />
                    <h2>{item.title}</h2>
                    <p>Price: ${item.price}</p>
                    <button>Buy Now</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
