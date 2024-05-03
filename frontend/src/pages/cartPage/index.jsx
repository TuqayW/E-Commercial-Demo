import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import { getList } from '../../cart/list.js';

const CartPage = () => {
    const [listo, setListo] = useState([]);
    const [infoto, setInfoto] = useState([]);

    useEffect(() => {
        const mirtList = getList();
        setListo(mirtList);

        const fetchData = async () => {
            try {
                const promises = mirtList.map(item =>
                    fetch(`https://fakestoreapi.com/products/${item.id}`).then(res => res.json())
                );
                const results = await Promise.all(promises);
                setInfoto(results);
            } catch (error) {
                console.error('Error fetching product info:', error);
            }
        };

        fetchData();

    }, []);

    return (
        <div className="esas">
            <Nav />
            <div className="cart-hisse">
                {listo.map(item => (
                    <div key={item.id} className="every">
                        <h1>{infoto.title}</h1>
                        <h1>{item.times}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartPage;
