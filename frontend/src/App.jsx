import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from "./pages/Main";
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './components/products';
import ProductPage from './pages/productPage';
import sha256 from "js-sha256"
import CartPage from './pages/cartPage';
import Add from './pages/add-item';

function App() {
  const [ipAddress, setIpAddress] = useState("")
  const [isLogged, setIsLogged] = useState("")
  let authUser = localStorage.getItem("authUser");
  let ida = localStorage.getItem("ipAd");
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
    const getUser = async () => {
      if (false) {
        localStorage.removeItem("authUser")
        localStorage.removeItem("rocLaw")
        return 0;
      }
      else {
        const response = await fetch(`http://127.0.0.1:8000/verify-token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "token":authUser, "ipAddress":ida }),
        });
        const data = await response.json();
        console.log(data)
        setIsLogged(data.valid)
        if(!data.valid){
          localStorage.removeItem("loglevele")
        }
      }
    };
    getUser()

  }, [])
  return (
    <div className="kola">
      <Routes>
        <Route path="/" element={!isLogged ? <Navigate to="/login" /> : <Main />} />
        <Route path="/products" element={!isLogged ? <Navigate to="/login" /> : <Products />} />
        <Route
          path="/login"
          element={isLogged ? <Navigate to="/" /> : <Login />}
        />
        <Route path='/add-item' element={localStorage.getItem("loglevele")==="seller" ? <Add/> : <Navigate to="/"/>}/>
        <Route path="/cart" element={!isLogged ? <Navigate to="/login" /> : <CartPage />} />
        <Route
          path="/signup"
          element={isLogged ? <Navigate to="/" /> : <Register />}
        />
        <Route path='/product/:id' element={!isLogged ? <Navigate to="/login" /> : <ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
