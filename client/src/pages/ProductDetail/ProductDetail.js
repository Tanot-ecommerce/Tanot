import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoginContext } from '../../component/context/ContextProvider'
import './ProductDetail.css'

import heart from '../../Images/heart.svg'

const ProductDetail = () => {

    const {account,setAccount} = useContext(LoginContext)
    //take data from backend (value of id in url)
    const { id } = useParams("");
    const Navigate = useNavigate("");
    // console.log(id)

    //to display product in slidebar
    const [selectedOptionsize, setSelectedOptionsize] = useState('');
    const [selectedOptionsqty, setSelectedOptionsqty] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    //to set dynamic image url and fetch dynamic data
    const [imageUrls, setImageUrl] = useState([]);
    const [indData, setIndData] = useState("");

    // dropdownmenu for quantity and size
    const handleSelectSize = (event) => {
        setSelectedOptionsize(event.target.value);
    };

    const handleSelectQty = (event) => {
        setSelectedOptionsqty(event.target.value);
    };



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
                setIndData(data);
                setImageUrl(data.url);
            }
        }

        getinddata();
    }, [id]);

    // console.log(indData);


    //add to cart function
    const addtocart = async(id) => {
        const checkres = await fetch(`/addCart/${id}`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                indData
            }),
            credentials:"include"
        });


        const data1= await checkres.json();
        // console.log(data1 +"ok");

        if(checkres.status !== 201)
        {
            console.log("user invalid");
            Navigate("/Auth");
            // alert("user invalid");
        }
        else{
            setAccount(data1);
            Navigate("/Cart");
            
            // console.log(account);
            // alert("data added in your cart");
        }
    }




    //below code is for imagesliderf


    const displayImage = (imageUrl) => {
        // Update the image source here
        const largeImg = document.getElementById('large-img');
        largeImg.src = imageUrl;
    };

    const changeImage = (direction) => {
        if (direction === 'next') {
            setCurrentImageIndex((currentImageIndex + 1) % imageUrls.length);
        } else if (direction === 'previous') {
            setCurrentImageIndex((currentImageIndex - 1 + imageUrls.length) % imageUrls.length);
        }

        const imageUrl = imageUrls[currentImageIndex];
        displayImage(imageUrl);
    };

    

    return (
        <>
            <div className='p-detail-outer'>
                <div className='p-left'>
                    <div className="product-images">
                        <div className="slider-button left" onClick={() => changeImage('previous')}>&lt;</div>
                        <div className="large-image">
                            <img id="large-img" src={imageUrls[currentImageIndex]} alt="Large Image" />
                        </div>
                        <div className="slider-button right" onClick={() => changeImage('next')}>&gt;</div>
                        <div className="thumbnail-images">
                            <img className="thumbnail" src={imageUrls[0]} alt="Thumbnail 1" onClick={() => displayImage(imageUrls[0])} />
                            <img className="thumbnail" src={imageUrls[1]} alt="Thumbnail 2" onClick={() => displayImage(imageUrls[1])} />
                            <img className="thumbnail" src={imageUrls[2]} alt="Thumbnail 3" onClick={() => displayImage(imageUrls[2])} />
                            {/* Add more thumbnail images as needed */}
                        </div>
                    </div>
                </div>
                <div className='p-right'>
                    <h3>{indData.title}</h3>
                    {/* <h3>Rs {indData.price[0].mrp} (Discount: {indData.price.discount})</h3> */}
                    <p>Tax Included.</p>
                    <hr />
                    <div className='dropdown-outer'>
                        <div className="dropdown-container">
                            <span><h5>Size: </h5></span>
                            <span>
                                <select className="dropdown-select" value={selectedOptionsize} onChange={handleSelectSize}>
                                    <option value="">Select Size</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select></span>
                            {/* <h3 className="selected-option">Selected Size: {selectedOption}</h3> */}
                        </div>
                        <div className="dropdown-container">
                            <h5>Quantity: </h5>
                            <select className="dropdown-select" value={selectedOptionsqty} onChange={handleSelectQty}>
                                <option value="">Quantity:</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            {/* <h3 className="selected-option">Selected Size: {selectedOption}</h3> */}
                        </div>
                    </div>
                    <p>
                        <img src={heart} alt='heart' style={{ width: "18px" }} />
                        Made In India
                    </p>

                    <button onClick={() => addtocart(indData.id)}>ADD TO CART</button>
                    <hr />
                    <h5>To Fit Measurment(Inches)</h5>
                    <img src='https://cdn.shopify.com/s/files/1/0275/0713/0416/files/New_Size_Chart_bbf6f145-3f78-4a71-8202-ef10269dead2_480x480.png?v=1659798588' alt='size-chart'></img>

                </div>
            </div>
        </>
    )
}

export default ProductDetail
