import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../../component/context/ContextProvider";
import { CircularProgress } from "@mui/material";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";
import "../../utils/generalstyles/generalstyles.css";

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);

    //to set current price of orders so that if in future
    //price of product changes then it will show current time price not of that time
    const [price, setPrice] = useState([]); 

    const { account, setAccount } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getCartData = async () => {
            if (!account) {
                navigate("/Auth");
            } else {
                const res = await fetch("/cart", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                const data = await res.json();
// console.log(data.carts);
                if (res.status !== 201) {
                    console.log("error");
                } else {
                    setCartData(data.carts);
                    

                    const keys = data.carts.map(cart => cart.price); // Replace 'name' with the desired key(s)
                    setPrice(keys);
                    // console.log(price);

                    setLoading(false);
                }
            }
        };

        getCartData();
    }, []);
    const placeOrder = async () => {
            const orderAmount = 10000;

            setLoading(true);
            const res = await fetch("/place/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderAmount,
                    cartData,
                    price
                }),
            });
            const data = await res.json();

            if (res.status === 422 || !data) {
                toast.warning("Server Error in savind data", {
                    position: "top-center",
                })
            } else {
                setCartData([]);
                toast.success("Order Placed successfully", {
                    position: "top-center",
                })
            }
            setLoading(false);
    }

return (
    <div className="flex flex-wrap p-6 justify-center">
       
        {
            price.length === 0 ? (
            <h1>No Item in Cart</h1>
            ):
            loading ? (
            <div className="flex flex-col items-center mt-16">
                <CircularProgress />
                <h2>Loading...</h2>
            </div>
        ) : (
            cartData.map((item) => (
                <div
                    key={item._id}
                    className="cart-item w-1/4 mx-4 my-4 p-4 border border-gray-300 rounded-md max-w-250"
                >
                    <img
                        src={item.images[0]}
                        alt={item.title}
                        className=" w-72 h-64 mb-4"
                    />
                    <h2 className="text-lg font-semibold mb-2">
                        {item.title}
                    </h2>
                    <p className="text-sm mb-4">Price: ${item.mrp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    <div className="flex justify-between mb-4">
                        <button className="block w-full px-4 py-2 shop-button text-white rounded-md">
                            Buy Now
                        </button>
                    </div>
                </div>
            ))
        )
        
        }
        <ToastContainer />
        { cartData.length !== 0 &&
        <button onClick={placeOrder}>Place Order</button>
        }
    </div>
);
};

export default Cart;
