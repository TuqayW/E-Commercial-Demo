import React, { useState } from 'react';
import './style.css';
import emailLogo from '../../assets/email.png';
import passwordLogo from '../../assets/password.png';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import sha256 from "js-sha256"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const showToast = () => {
    toast.error('An error occurred!');
  };

  const getIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org/?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
      showToast('Error fetching IP address');
    }
  };

  const clickHandle = async () => {
    if (email === "" || email === " " || password === "" || password === " ") {
      toast.error('Fill all of the form!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {


      try {
        const response = await fetch('http://127.0.0.1:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Failed to login user');
        }

        const data = await response.json();
        console.log(data)
        localStorage.setItem("loglevele",data.role)
        localStorage.setItem("ipAd",data.ipAddress)
        localStorage.setItem("authUser",data.access_token);
        <Link to="/"></Link>
        window.location.reload(); 
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Email or password is wrong!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };


  return (
    <div className='logoin'>
      <ToastContainer />
      <div className='yuxari'>
        <div className='yeke-yazi'>
          <h1>Hello Again!</h1>
        </div>
        <div className='bala-yazi'>
          <h1>Welcome Back</h1>
        </div>
      </div>
      <div className='asagi'>
        <div className='bigodivo'>
          <img src={emailLogo} alt='email' />
          <input
            className='int'
            placeholder='Email Address'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='bigodivo'>
          <img src={passwordLogo} alt='password' />
          <input
            className='int'
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='button'>
          <button onClick={clickHandle}>Login</button>
        </div>
        <div className='end'>
          <h1 className='acc'>Dont have an account?</h1>
          <Link to='/signup'>
            <button className='btnrg'>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
