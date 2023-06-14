import React from 'react'
import { Link } from 'react-router-dom';
import './DisplayProduct.css'

function DisplayProduct(props){
  const {dataArray} = props;
  
  
  return (
    <>
    <Link to={`/productdetail/${dataArray.id}`} className='card'>
     <div >
      <div className='product-img'>
       <img src={dataArray.url} alt='product-img' />
       <p>{dataArray.discount}</p>
      </div>
      <div className='description'>
        <h4>{dataArray.title}</h4>
        <div className='price'>
          <s className='mrp'>Rs. {dataArray.price.mrp} Rs</s>
          <span className='realp'>Rs. {dataArray.price.cost} Rs</span>
        </div>
      </div>
     </div>
     </Link>
    </>
  )
}

export default DisplayProduct
