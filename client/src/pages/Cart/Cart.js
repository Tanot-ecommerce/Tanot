import React, { useEffect, useState } from "react";
import "./Cart.css";
import Cartdata from "../../data/CartData";
import { CircularProgress } from "@mui/material";
// import DisplayProduct from "../../component/DisplayProduct/DisplayProduct";
const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            }
        };

        getdatabuy();
    }, []);

    return (
        <div>
            {
                loading ? (
                    <div className="circle">
                        <CircularProgress />
                        <h2>Loading...</h2>
                    </div>
                ) :
                    (
                        cartData.map((item) => (
                            <div key={item._id}>
                                <img src={item.url[0]} alt={item.title} />
                                <h2>{item.title}</h2>
                                <p>Price: ${item.mrp}</p>
                                <button>Buy Now</button>
                            </div>
                        ))
                    )
            }
        </div>
    );
};

export default Cart;
