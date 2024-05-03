import React, { useState, useEffect } from 'react';
import "./style.css";
import emailLogo from "../../assets/email.png";
import passwordLogo from "../../assets/password.png";
import { Link } from 'react-router-dom';
import humanLogo from "../../assets/human.png"
import sha256 from "js-sha256"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("")
  const [ipAddress, setIpAddress] = useState('');

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
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, password, email }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const data = await response.json();
      getIpAddress()
      const hashedValue = sha256(`${email}${ipAddress}`);
      localStorage.setItem('authUser', hashedValue);
      console.log(response)
      localStorage.setItem("rocLaw", data.id)
      window.location.reload();
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  return (
    <div className='logoin'>
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

export default Login;
