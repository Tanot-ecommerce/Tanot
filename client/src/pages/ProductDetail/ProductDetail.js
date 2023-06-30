import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../component/context/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ImageGallery from "react-image-gallery";
import Accordation from "../../component/Accordation/Accordation";
import "react-image-gallery/styles/css/image-gallery.css";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./ProductDetail.css";
import "../../utils/generalstyles/generalstyles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {

    const { account, setAccount } = useContext(LoginContext);
    const [images, setImages] =useState([]);
    const [loadingText, setLoadingText] =useState("");
    //take data from backend (value of id in url)
    const { id } = useParams("");
    const Navigate = useNavigate("");
    // console.log(id)

    //to set dynamic image url and fetch dynamic data
    const [indData, setIndData] = useState("");
    const [objectId, setObjectId] = useState("");

    //to heighlite button of size when clicking
    const [selectedButton, setSelectedButton] = useState(null);

    const highlightButton = (size) => {
        setSelectedButton(size);
        
    };

    //set loading
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getinddata = async () => {
            setLoading(true)
            setLoadingText("loading Item...")
            const res = await fetch(`/productdetail/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
             setObjectId(data._id);
            // console.log(data._id);
            // console.log(data);
            if (res.status !== 201) {
                console.log("no individual data available");
            } else {
                console.log("got individual data");
                setLoading(false);
                setIndData(data);

                //set images
                const newImages = data.images.map(link => ({
                    original: link,
                    thumbnail: link
                  }));
              
                  setImages([]);
                  setImages(prevImages => [...prevImages, ...newImages]);
            }
            setLoading(false);
        };

        // setTimeout(getinddata,1000);
        getinddata();
    }, [id]);

    // console.log(indData);

    //add to cart function
    const addtocart = async (id) => {
        if (!account) //alert("please login first to add item in your cart.");
          {
            setTimeout(() => {
                toast.warning("please login first to add item in your cart.", {
                  position: "top-center",
                 });
                 }, 2000); 
          }
       else if(!selectedButton){
            toast.warning("please select size", {
                position: "top-center",
            });
        }
        else {
            setLoading(true);
            setLoadingText("adding item in your cart...")
            const checkres = await fetch(`/addCart/${id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    objectId,
                    selectedButton
                }),
                credentials: "include",
            });

            const data1 = await checkres.json();
            // console.log(data1 +"ok");
           

            if (checkres.status !== 201) {
                console.log("user invalid");
                Navigate("/Auth");
                // alert("user invalid");
            } else {
                setAccount(data1); 
                Navigate("/Cart");

                // console.log(account);
                // alert("data added in your cart");
            }
          
        }
        setLoading(false);
    };

    return (
        <>
            {loading ? (
                <div className="circle">
                    <CircularProgress />
                    <h2>{loadingText}</h2>
                </div>
            ) : (
                <div className="p-detail-outer">
                    <div className="p-left">
                        <ImageGallery
                            items={images}
                            showPlayButton={false}
                            showIndex={true}
                        />
                    </div>
                    <div className="p-right">
                        <h3>{indData.title}</h3>
                        {/* price and mrp and discount will be showed here */}
                        <span>
                            <h3 style={{ display: "inline-block" }}>
                                &#8377;{indData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </h3>{" "}
                        </span>
                        <span style={{ textDecorationLine: "line-through" }}>
                            
                            &#8377; {indData.mrp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                        <span>({indData.discount}% Off)</span>

                        <hr />

                        <div className="size-select">
                            <label>size</label>
                            <div className="size-buttons">
                                <button
                                    className={
                                        selectedButton === "S"
                                            ? "highlighted-size-btn"
                                            : "size-button"
                                    }
                                    onClick={() => highlightButton("S")}
                                >
                                    S
                                </button>
                                <button
                                    className={
                                        selectedButton === "M"
                                            ? "highlighted-size-btn"
                                            : "size-button"
                                    }
                                    onClick={() => highlightButton("M")}
                                >
                                    M
                                </button>
                                <button
                                    className={
                                        selectedButton === "L"
                                            ? "highlighted-size-btn"
                                            : "size-button"
                                    }
                                    onClick={() => highlightButton("L")}
                                >
                                    L
                                </button>
                                <button
                                    className={
                                        selectedButton === "XL"
                                            ? "highlighted-size-btn"
                                            : "size-button"
                                    }
                                    onClick={() => highlightButton("XL")}
                                >
                                    XL
                                </button>
                                <button
                                    className={
                                        selectedButton === "XXL"
                                            ? "highlighted-size-btn"
                                            : "size-button"
                                    }
                                    onClick={() => highlightButton("XXL")}
                                >
                                    XXL
                                </button>
                            </div>
                        </div>
                        <div className="detail-promise">
                            <p>
                                <FavoriteBorderIcon
                                    style={{ marginRight: "5px" }}
                                />
                                Made In India
                            </p>
                            <Link
                                to="https://wa.me/+919672332213"
                                className="detail-promise-link"
                            >
                                <p>
                                    <WhatsAppIcon
                                        style={{ marginRight: "5px" }}
                                    />
                                    Contact Us
                                </p>
                            </Link>
                        </div>
                        <button
                            className={
                                account
                                    ? "cart-button"
                                    : "cart-button disabled-add-to-cart-btn"
                            }
                            onClick={() => addtocart(objectId)}>
                            ADD TO CART
                        </button>
                        <hr />
                        <div className="accordation-items">
                            <Accordation />
                        </div>
                        <h5>To Fit Measurment(Inches)</h5>
                        <img
                            src="https://cdn.shopify.com/s/files/1/0275/0713/0416/files/New_Size_Chart_bbf6f145-3f78-4a71-8202-ef10269dead2_480x480.png?v=1659798588"
                            alt="size-chart"
                            style={{ width: "80%" }}
                        ></img>
                    </div>
                </div>
            )
           
            }
            <ToastContainer />
        </>
    );
};

export default ProductDetail;
