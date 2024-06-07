import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./style.css";
import Nav from '../../components/nav';
import Loading from "../../assets/loading.gif";
import { addItem, removeItem, clearList, getList } from '../../cart/list.js';


const ProductPage = () => {
    const [loading, setLoading] = useState(true);
    const [sitem, setSitem] = useState({});
    const [clicked, setClicked] = useState([true, "s"]);
    const [selectedColor, setSelectedColor] = useState([true, "gray"]);

    const btnClicked = (a) => {
        setClicked([true, `${a}`]);
    };

    const handleAddItem = () => {
        addItem(sitem.id);
        console.log('List after adding:', getList());
    };

    const clickedColor = (color) => {
        setSelectedColor([true, `${color}`]);
    }

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/getProductById/${id}`)
            .then(res => res.json())
            .then(json => {
                setSitem(json);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className='working'>
            <Nav />
            {loading ? ( 
                <div><img src={Loading} alt="" /></div>
            ) : (
                <div className='contentTable'>
                    <div className="left">
                        <div className="small-icons">
                            <img src={sitem.imageurl} alt="" />
                            <img src={sitem.imageurl} alt="" />
                            <img src={sitem.imageurl} alt="" />
                        </div>
                        <div className="big-img">
                            <img src={sitem.imageurl} alt="" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="tittyle">
                            <h1>{sitem.title}</h1>
                        </div>
                        <div className="sizes">
                            <h1>SIZE:</h1>
                            <div className="btnsss">
                                <button onClick={() => btnClicked("xs")} className={clicked[1] === "xs" ? "selected-btn" : "size"}>XS</button>
                                <button onClick={() => btnClicked("s")} className={clicked[1] === "s" ? "selected-btn" : "size"}>S</button>
                                <button onClick={() => btnClicked("m")} className={clicked[1] === "m" ? "selected-btn" : "size"}>M</button>
                                <button onClick={() => btnClicked("l")} className={clicked[1] === "l" ? "selected-btn" : "size"}>L</button>
                            </div>
                        </div>
                        <div className="colors">
                            <h1>COLOR:</h1>
                            <div className="cc">
                                <div onClick={() => clickedColor("gray")} className={selectedColor[1] === "gray" ? "selected-color-gray" : "gray"}></div>
                                <div onClick={() => clickedColor("black")} className={selectedColor[1] === "black" ? "selected-color-black" : "black"}></div>
                                <div onClick={() => clickedColor("green")} className={selectedColor[1] === "green" ? "selected-color-green" : "green"}></div>
                            </div>
                        </div>
                        <div className="prico">
                            <h1>PRICE:</h1>
                            <h1>{[("$"), sitem.price]}</h1>
                        </div>
                        <button onClick={handleAddItem} className='btno'>ADD TO CART</button>
                        <div className="desc">
                            <h1>{sitem.description}</h1>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
