import React from "react";
import { Link } from "react-router-dom";
import "./DisplayProduct.css";

function DisplayProduct(props) {
    const { dataArray } = props;
    const commaMrp = dataArray.mrp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const commaPrice = dataArray.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <>
            <Link to={`/productdetail/${dataArray._id}`} className="card">
                <div>
                    <div className="product-img">
                        <img src={dataArray.images[0]} alt="product-img" />
                        <p>{dataArray.discount} %off</p>
                    </div>
                    <div className="description">
                        <h4>{dataArray.title} </h4>
                        <div className="price">
                            <s className="mrp">Rs. {commaMrp} Rs</s>
                            <span className="realp">
                                Rs. {commaPrice} Rs
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default DisplayProduct;
