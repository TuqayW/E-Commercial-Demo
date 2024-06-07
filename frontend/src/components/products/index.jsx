import React, { useState, useEffect } from 'react';
import Product from '../product';
import "./style.css"

const Products = () => {
  const [infos, setInfos] = useState([]);
  const [inffos,setInffos]=useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:8000/getAllProducts")
      .then(res=>res.json())
      .then(json=> setInffos(json))
  }, []);
  return (
    <>
      <div className='big-Text'>
        <h1>Products</h1>
      </div>
      <div className='Productss'>
        {
          inffos?.map(info => (
            <Product key={info.id} id={info.id} title={info.title} price={info.price} imgurl={info.imageurl} />
          ))
        }
      </div>
    </>
  );
};

export default Products;
