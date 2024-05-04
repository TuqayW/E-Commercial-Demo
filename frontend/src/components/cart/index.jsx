import React, { useEffect, useState } from 'react'
import "./style.css"

const Cart = ({ id, times }) => {
    const [data, setData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const json = await response.json();
            setData(json);
            console.log(json);
        };

        fetchData();
    }, []);

    return (
        <div className='allo'>
            {
                data &&
                <div className='theend'>
                    <div className="lefte">
                        <div className="tebeqe1">
                            {data.title}
                        </div>
                        <div className="tebeqe2">
                            {data.category}
                        </div>
                        <div className="tebeqe3">

                        </div>
                        <div className="tebeqe4">

                        </div>
                        <div className="tebeqe5">

                        </div>
                    </div>
                    <div className="righte">
                        <img src={data.image} alt="" />
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart