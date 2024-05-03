import React, { useState } from 'react';
import "./style.css";
import centerimg from "../../assets/center.png"
import dollar from "../../assets/dollar.png"
import cart from "../../assets/carto.png"

const Nav = () => {
  const [clicked, setClicked] = useState([true, "btn1"]);

  const btnClicked = (a) => {
    setClicked([true, `${a}`]);
  };

  return (
    <div className='all'>
      <div className='divo part-one'>
        <button onClick={() => btnClicked("btn1")} className={clicked[1] === "btn1" ? "selected" : "btn"}>Women</button>
        <button onClick={() => btnClicked("btn2")} className={clicked[1] === "btn2" ? "selected" : "btn"}>Men</button>
        <button onClick={() => btnClicked("btn3")} className={clicked[1] === "btn3" ? "selected" : "btn"}>Kids</button>
      </div>
      <div className='divo part-two'>
        <img src={centerimg} alt="" />
      </div>
      <div className='divo part-three'>
        <img src={dollar} alt="" />
        <button className='cart'><img className='cartImg' src={cart} alt="" /></button>
      </div>
    </div>
  );
};

export default Nav;
