import React, { useState, useEffect } from 'react';

import './ImageSlider.css'

const ImageSlider = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const {tempUrls} = props;
  const [imageUrls,setImageUrls]=useState(tempUrls);
  useEffect(()=>{
    setImageUrls()
  })
  // console.log(imageUrls[0]);
  // const imageUrls = [
  //   'https://via.placeholder.com/500',
  //   'https://via.placeholder.com/600',
  //   'https://via.placeholder.com/700'
  //   // Add more image URLs as needed
  // ];
  
  

  
  return (
   <></>
  );
};

export default ImageSlider;
