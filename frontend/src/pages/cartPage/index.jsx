import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import { getList } from '../../cart/list.js';
import Cart from '../../components/cart/index.jsx';
import "./style.css"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const CartPage = () => {
    const [listo, setListo] = useState([]);
    const [infoto, setInfoto] = useState([]);
    let quan = 0
    useEffect(() => {
        const mirtList = getList();
        setListo(mirtList);
        console.log(mirtList)
    }, []);

    const yupe = () => {
        toast.success('Order placed!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
    return (
        <div className="esas">
            <ToastContainer />
            <Nav />
            <div className="cart-hisse">
                <div className="headYazi">
                    <h1>CART</h1>
                </div>
                <div className="productlar">
                    {listo.map(item => (
                        <Cart className="cont" key={item.id} id={item.id} times={item.times} />
                    ))}
                    {listo.map(item => {
                        quan = quan + Number(item.times)
                        console.log(quan)
                    })}
                </div>
                <div className="price">
                    <h1>Tax 21%:</h1>
                    <h1>Quantity:{quan}</h1>
                    <h1>Total:</h1>
                    <button onClick={yupe}>ORDER</button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
