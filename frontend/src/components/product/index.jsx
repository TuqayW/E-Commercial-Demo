import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Product = ({ id, title, price, imgurl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div onClick={handleClick} className='alo'>
      <img className='imgurl' src={imgurl} alt='' />
      <h1 className='title'>{title}</h1>
      <h1 className='price'>${price}</h1>
    </div>
  );
};

export default Product;
