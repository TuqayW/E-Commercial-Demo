import React, { useState } from 'react';
import "./style.css";
import emailLogo from "../../assets/email.png";
import passwordLogo from "../../assets/password.png";
import { Link } from 'react-router-dom';
import humanLogo from "../../assets/human.png";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import sha256 from "js-sha256";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [ipAddress, setIpAddress] = useState('');
  const [role,setRole]=useState("")
  const getIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org/?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      toast.error('Error fetching IP address', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return '';
    }
  };

  const clickHandle = async () => {
    if (email === "" || password === "" || name === "" || surname === "") {
      toast.error('Fill all of the forms!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      const ip = await getIpAddress();
      setIpAddress(ip);
      localStorage.setItem("loglevele",role)
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, password, email, ipAddress: ip ,role:role}),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      localStorage.setItem("email",email)
      const data = await response.json();
      localStorage.setItem("ipAd", ip);
      localStorage.setItem('authUser', data.access_token);
      console.log('Registration successful:', data);
      <Link to="/"></Link>
      window.location.reload();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className='logoin'>
      <ToastContainer />
      <div className="yuxari">
        <div className="yeke-yazi">
          <h1>Hello Again!</h1>
        </div>
        <div className="bala-yazi">
          <h1>Welcome Back</h1>
        </div>
      </div>
      <div className="asagi">
        <div className="ints">
          <div className="bigodivo">
            <img src={humanLogo} alt="name" />
            <input
              className='int'
              placeholder='Name'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="bigodivo">
            <img src={humanLogo} alt="surname" />
            <input
              className='int'
              placeholder='Surname'
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="bigodivo">
            <img src={passwordLogo} alt="password" />
            <input
              className='int'
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="bigodivo">
            <img src={emailLogo} alt="email" />
            <input
              className='int'
              placeholder='Email Address'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="intq">
            <select onChange={(e) => setRole(e.target.value)} className="selectione int" name="roles" id="roles">
              <option className='optione' value="buyer">Buyer</option>
              <option className='optione' value="seller">Seller</option>
            </select>
          </div>
        </div>

        <div className="button">
          <button onClick={clickHandle}>Sign Up</button>
        </div>
        <div className="end">
          <h1 className='acc'>Have an account?</h1>
          <Link to="/login">
            <button className='btnrg'>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
