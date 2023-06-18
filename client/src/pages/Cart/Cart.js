import React, { useEffect, useState, useContext } from "react";
import "./Cart.css";
import { useNavigate } from "react-router";
import { LoginContext } from "../../component/context/ContextProvider";
import { CircularProgress } from "@mui/material";
// import DisplayProduct from "../../component/DisplayProduct/DisplayProduct";
const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log(cartData);

    //for redirecting user if he is not logged in
    const { account, setAccount } = useContext(LoginContext);
    const navigate = useNavigate();
    useEffect(() => {
        const getdatabuy = async () => {
            if(!account)
            {
                navigate("/Auth");
            }
            else{
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
