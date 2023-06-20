import React from "react";
import { Link } from "react-router-dom";
import "./ShopByCategory.css";
import category1 from "../../Images/krti-typ1.jpg";
import category2 from "../../Images/krti-typ3.jpg";
import category3 from "../../Images/krti-typ1.jpg";

const shopByCategory = () => {
    return (
        <div className="category-container p-6">
            <h2 className="text-4xl label-arial text-center my-6">
                Shop By Category
            </h2>
            <div className="category-wrapper p-8">
                <div className="category">
                    <Link to="/collections/1">
                        <img
                            src={category1}
                            alt="delievery_icon"
                            className="category-img"
                        />
                    </Link>
                </div>
                <div className="category">
                    <Link to="/collections/2">
                        <img
                            src={category2}
                            alt="quality_icon"
                            className="category-img"
                        />
                    </Link>
                </div>
                <div className="category">
                    <Link to="/collections/3">
                        <img
                            src={category3}
                            alt="return_icon"
                            className="category-img"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default shopByCategory;
