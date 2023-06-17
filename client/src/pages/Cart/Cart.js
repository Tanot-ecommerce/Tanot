import React, { useEffect, useState } from "react";
import "./Cart.css";
import CartData from "../../data/CartData";
// import DisplayProduct from "../../component/DisplayProduct/DisplayProduct";
const Cart = () => {
    const [cartData, setCartData] = useState("");
    // console.log(cartData);

    useEffect(() => {
        const getdatabuy = async () => {
            const res = await fetch("/cart", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();

            if (res.status !== 201) {
                console.log("error");
            } else {
                setCartData(data.carts);
            }
        };

        getdatabuy();
    }, []);

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
