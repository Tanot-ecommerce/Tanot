import React from 'react'
import './Promises.css'
import delievery from '../../Images/delievery.svg'
import quality from '../../Images/quality.svg'
import retrn from '../../Images/return.svg'

const Promises = () => {
  return (
    <>
     <div className='main-container'>
      <h2 className='heading'>Our promises</h2>
      <div className='promise-wrapper'>
       <div className='promise'>
          <img src={delievery} alt='delievery_icon'  className='promise-img' style={{width: 55}}/>
          <h4>Delievery</h4>
          <p>Our promise: Fast, secure, and transparent delivery with exceptional customer service.</p>
       </div>
       <div className='promise'>
       <img src={quality} alt='quality_icon'  className='promise-img' style={{width: 45}}/>
          <h4>Quality</h4>
          <p>High-quality products that exceed your expectations, backed by our commitment to customer service.</p>
       </div>
       <div className='promise'>
       <img src={retrn} alt='return_icon'  className='promise-img' style={{width: 55}}/>
       <h4>Return</h4>
          <p>Hassle-free and transparent product return process, ensuring your satisfaction.</p>
       </div>
      </div>
     </div> 
    </>
  )
}

export default Promises
