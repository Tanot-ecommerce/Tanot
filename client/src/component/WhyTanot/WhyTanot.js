import React from "react";
import "./WhyTanot.css";
import expert from "../../Images/expert.png";
import star from "../../Images/star.png";
import DoingGood from "../../Images/DoingGood.png";
import goodBusniuss from "../../Images/goodBusniuss.png";
import greatBalance from "../../Images/greatBalance.png";

const WhyTanot = () => {
  return (
    <>
      <div className="main-container">
        <h2 className="heading">Why Tanot?</h2>
        <div className="commit-wrapper">
          <div className="commit">
            <img
              src={expert}
              alt="delievery_icon"
              className="commit-img"
              style={{ width: 55 }}
            />
            <h4 className="commit-heading">Expert Designer</h4>
            <p className="commit-description">for good looking designs.</p>
          </div>
          <div className="commit">
            <img
              src={star}
              alt="delievery_icon"
              className="commit-img"
              style={{ width: 55 }}
            />
            <h4 className="commit-heading">Good Design</h4>
            <p className="commit-description">that attract everyone.</p>
          </div>
          <div className="commit">
            <img
              src={DoingGood}
              alt="delievery_icon"
              className="commit-img"
              style={{ width: 55 }}
            />
            <h4 className="commit-heading">Doing Good</h4>
            <p className="commit-description">for environment and community.</p>
          </div>
          <div className="commit">
            <img
              src={goodBusniuss}
              alt="delievery_icon"
              className="commit-img"
              style={{ width: 55 }}
            />
            <h4 className="commit-heading">Good business practices</h4>
            <p className="commit-description">at all levels.</p>
          </div>
          <div className="commit">
            <img
              src={greatBalance}
              alt="delievery_icon"
              className="commit-img"
              style={{ width: 55 }}
            />
            <h4 className="commit-heading">Great balance</h4>
            <p className="commit-description">
              between style and sustainability
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyTanot;
