import React, { useState, useEffect } from 'react';
import "./style.css";
import centerimg from "../../assets/center.png";
import dollar from "../../assets/dollar.png";
import cart from "../../assets/carto.png";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [clicked, setClicked] = useState([true, "btn1"]);
  const [isSeller, setIsSeller] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const loglevele = localStorage.getItem('loglevele');
    if (loglevele === 'seller') {
      setIsSeller(true);
    }
  }, []);

  const btnClicked = (a) => {
    setClicked([true, `${a}`]);
  };
  const clickHandle=()=>{
    navigate("/add-item");
  }
  return (
    <div className='all'>
      <div className='divo part-one'>
        <button onClick={() => btnClicked("btn1")} className={clicked[1] === "btn1" ? "selected" : "btn"}>Women</button>
        <button onClick={() => btnClicked("btn2")} className={clicked[1] === "btn2" ? "selected" : "btn"}>Men</button>
        <button onClick={() => btnClicked("btn3")} className={clicked[1] === "btn3" ? "selected" : "btn"}>Kids</button>
      </div>
      <div className='divo part-two'>
        <Link to="/">
          <img src={centerimg} alt="" />
        </Link>
      </div>
      <div className='divo part-three'>
        <img src={dollar} alt="" />
        <Link to="/cart">
          <button className='cart'><img className='cartImg' src={cart} alt="" /></button>
        </Link>
      </div>
      <div className="add-item">
        {isSeller && <button onClick={clickHandle} className='add-item-button'>Add Item</button>}
      </div>
    </div>
  );
};

export default Nav;
