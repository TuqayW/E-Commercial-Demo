import React, { useState } from 'react'
import Nav from '../../components/nav'
import "./style.css"
const add_item = () => {
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const itemAdd = async() => {
    const response = await fetch('http://127.0.0.1:8000/add-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"imageurl":url,"title":title,"description":description,"price":price}),
    });
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    const data = await response.json();
    console.log(data)

  }
  return (
    <div className="additem">
      <div className="yuxa">
        <Nav />
      </div>
      <div className="formr">
        <div className="topo">
          <h1>Add Item</h1>
        </div>
        <div className="botomo">
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Enter image url' className='intqq' type="url" />
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter product title' className='intqq' type="text" />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter product description' className='intqq' type="text" />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter product Price' className='intqq' type="text" />
          <div className="button">
            <button onClick={itemAdd}>Add Item</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default add_item