import React, { useState, useContext } from 'react';
import { LoginContext } from "../context/ContextProvider";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import './ModalForm.css'

const ModalForm = ({ isOpen, onClose }) => {
  const { account, setAccount } = useContext(LoginContext);
  const [number, setNumber] =useState("");
  const [orderId, setOrderId] =useState("");
  const [complaint, setComplaint] =useState("");

  const navigate = useNavigate();

  if(isOpen && !account){
    onClose();
    navigate("/Auth");
    toast.warning("please Login or Register First", {
      position: "top-center",
  });
  }

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform form submission logic here
    // ...
      const id = account.email;
      const name = account.name;
  
      const res = await fetch("/add/complaints", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          number,
          orderId,
          complaint
        }),
    });
    const data = await res.json();
     
    if (res.status === 422 || !data) {
      alert("Error in savind data no data");

  } else {
      alert("data successfully added");
    setNumber("");
    setOrderId("");
    setComplaint("");
  }

    // Close the modal form after submission
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>

            <form onSubmit={handleSubmit}>
              {/* Your form fields here */}
               <h4>If you have complaint regarding order then please write order information</h4>
               <h5>Order Id</h5>
               <input placeholder='Order Id' type='number' onChange={(e)=>{setOrderId(e.target.value)}}></input>
               <h5>Contact Number</h5>
               <input placeholder='Contact Number' type='number' onChange={(e)=>{setNumber(e.target.value)}}></input>
               <h5>Please Write your Complaint ( Or Feedback)</h5>
               <textarea rows="3" cols="50" onChange={(e)=>{setComplaint(e.target.value)}}></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
          <ToastContainer />
        </div>
      )}

      
    </>
  );
};

export default ModalForm;
