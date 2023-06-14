import React, { useEffect, useState } from 'react'
import './Cart.css'
import DisplayProduct from "../../component/DisplayProduct/DisplayProduct"
const Cart = () => {

const [cartData, setCartData] =useState("");
// console.log(cartData.carts);

  

  useEffect(() =>{
    const getdatabuy = async() =>{
      const res = await fetch("/cart",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
  
      const data = await res.json();
  
      if(res.status !== 201){
        console.log("error");
      }
      else{
        setCartData(data.carts);
      }
    };

    getdatabuy();
  },[])


  return (
    <>
      <div className='cart-main'>
        <div className='cart-left'>
        
        </div>
        <div className='cart-right'>

        </div>
      </div>
    </>
  )
}

export default Cart
