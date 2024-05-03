import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from "./pages/Main";
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './components/products';
import ProductPage from './pages/productPage';
import sha256 from "js-sha256"
import CartPage from './pages/cartPage';

function App() {
  const [ipAddress, setIpAddress] = useState("")
  const [userName, setUserName] = useState("")
  let authUser = localStorage.getItem("authUser");
  let ida = localStorage.getItem("rocLaw");
  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };
    const getUserById = async () => {
      const response = await fetch(`http://127.0.0.1:8000/getUserById/${ida}`);
      const data = await response.json();
      setUserName(data)
    };
    getUserById()

    getIpAddress()
    const hashedValue = sha256(`${userName}${ipAddress}`);
    localStorage.getItem('authUser');
    if (hashedValue === authUser) {
      authUser = true;
    }
    else {
      authUser = false;
    }
  },[])
  return (
    <div className="kola">
      <Routes>
        <Route path="/" element={!authUser ? <Navigate to="/login" /> : <Main />} />
        <Route path="/products" element={!authUser ? <Navigate to="/login" /> : <Products />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/cart" element={!authUser ? <Navigate to="/login" /> : <CartPage />} />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Register />}
        />
        <Route path='/product/:id' element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
