import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LoginContext } from '../../component/context/ContextProvider'
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImageGallery from 'react-image-gallery';
import Accordation from '../../component/Accordation/Accordation';
import 'react-image-gallery/styles/css/image-gallery.css'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import './ProductDetail.css'

const ProductDetail = () => {

    const images = [
        {
            original: 'https://assets0.mirraw.com/images/9776044/image_long_webp.webp?1639394927',
            thumbnail: 'https://assets0.mirraw.com/images/9776044/image_long_webp.webp?1639394927',
        },
        {
            original: 'https://assets0.mirraw.com/images/9782377/image_long_webp.webp?1639987394',
            thumbnail: 'https://assets0.mirraw.com/images/9782377/image_long_webp.webp?1639987394',
        },
        {
            original: 'https://assets0.mirraw.com/images/10692953/MF2705_01_long_webp.webp?1661248766',
            thumbnail: 'https://assets0.mirraw.com/images/10692953/MF2705_01_long_webp.webp?1661248766',
        },
    ];

    const { account, setAccount } = useContext(LoginContext)
    //take data from backend (value of id in url)
    const { id } = useParams("");
    const Navigate = useNavigate("");
    // console.log(id)

    //to set dynamic image url and fetch dynamic data
    const [indData, setIndData] = useState("");


    //to heighlite button of size when clicking
    const [selectedButton, setSelectedButton] = useState(null);

    const highlightButton = (buttonIndex) => {
        setSelectedButton(buttonIndex);
    };


    //set loading 
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getinddata = async () => {
            const res = await fetch(`/productdetail/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });


            const data = await res.json();
            // console.log(data);
            if (res.status !== 201) {
                console.log("no individual data available");
            }
            else {
                console.log("got individual data");
                setLoading(false);
                setIndData(data);
            }
        }

        // setTimeout(getinddata,1000);
        getinddata();
    }, [id]);

    // console.log(indData);


    //add to cart function
    const addtocart = async (id) => {
        if (!account)
            alert("please login first to add item in your cart.");
        else {
            const checkres = await fetch(`/addCart/${id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    indData
                }),
                credentials: "include"
            });


            const data1 = await checkres.json();
            // console.log(data1 +"ok");

            if (checkres.status !== 201) {
                console.log("user invalid");
                Navigate("/Auth");
                // alert("user invalid");
            }
            else {
                setAccount(data1);
                Navigate("/Cart");

                // console.log(account);
                // alert("data added in your cart");
            }
        }
    }



    return (
        <>
            {
                loading ?
                    (
                        <div className="circle">
                            <CircularProgress />
                            <h2>Loading...</h2>
                        </div>
                    )
                    :
                    (
                        <div className='p-detail-outer'>
                            <div className='p-left'>
                                <ImageGallery items={images} showPlayButton={false} showIndex={true} />
                            </div>
                            <div className='p-right'>
                                <h3>{indData.title}</h3>
                                {/* price and mrp and discount will be showed here */}
                                <span><h3 style={{ display: "inline-block" }}>&#8377;  </h3> </span>
                                <span style={{ textDecorationLine: 'line-through' }}> &#8377;  </span>
                                <span>(40% Off)</span>

                                <hr />

                                <div className='size-select'>
                                    <label>size</label>
                                    <div className='size-buttons'>
                                        <button className={selectedButton === 1 ? 'highlighted-size-btn' : 'size-button'}
                                            onClick={() => highlightButton(1)}>S</button>
                                        <button className={selectedButton === 2 ? 'highlighted-size-btn' : 'size-button'}
                                            onClick={() => highlightButton(2)}>M</button>
                                        <button className={selectedButton === 3 ? 'highlighted-size-btn' : 'size-button'}
                                            onClick={() => highlightButton(3)}>L</button>
                                        <button className={selectedButton === 4 ? 'highlighted-size-btn' : 'size-button'}
                                            onClick={() => highlightButton(4)}>XL</button>
                                        <button className={selectedButton === 5 ? 'highlighted-size-btn' : 'size-button'}
                                            onClick={() => highlightButton(5)}>XXL</button>
                                    </div>
                                </div>
                                <div className='detail-promise'>
                                    <p>
                                    <FavoriteBorderIcon style={{marginRight:"5px"}}/>
                                      Made In India
                                    </p>
                                    <Link to="https://wa.me/+919672332213" className='detail-promise-link'>
                                    <p>
                                        <WhatsAppIcon style={{marginRight: "5px"}}/>
                                        Contact Us
                                    </p>
                                    </Link>
                                </div>
                                <button className={account ? 'add-to-cart-btn': 'add-to-cart-btn disabled-add-to-cart-btn'} onClick={() => addtocart(indData.id)}>ADD TO CART</button>
                                <hr />
                                <div className='accordation-items'>
                                    <Accordation />
                                </div>
                                <h5>To Fit Measurment(Inches)</h5>
                                <img src='https://cdn.shopify.com/s/files/1/0275/0713/0416/files/New_Size_Chart_bbf6f145-3f78-4a71-8202-ef10269dead2_480x480.png?v=1659798588' alt='size-chart' style={{ width: "80%" }}></img>

                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default ProductDetail
