import React, { useState, useEffect } from 'react';
import Product from '../product';
import "./style.css"

const Products = () => {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setInfos(json));
  }, []);
  return (
    <>
      <div className='big-Text'>
        <h1>Products</h1>
      </div>
      <div className='Productss'>
        {
          infos?.map(info => (
            <Product key={info.id} id={info.id} title={info.title} price={info.price} imgurl={info.image} />
          ))
        }
      </div>
    </>
  );
};

export default Products;
