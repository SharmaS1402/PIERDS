import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./style.css";

const Form = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate=useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSignUp = () => {
    if (selectedOption === 'org') {
      navigate("organisation");
    } else {
      navigate("user");
    }
  };

  return (
    <body className="bo">
      <div className="login-container">
        <div className="container2">
          <div className="name2">PIERDS</div>
        </div>
        <div className="ka">
          <div className="login-box">
            <div>
              <nav className="navbar">
                <ul className="nav-list">
                  <li className="nav-item">
                    <a href="#home">Home</a>
                  </li>
                  <li className="nav-item">
                    <a href="#about">About</a>
                  </li>
                </ul>
              </nav>
            </div>
            <h2 className="login-header">Sign up to PIERD</h2>
            <form className="login-form">
              <label htmlFor="username" className="login-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="login-input"
                placeholder="Enter your username"
              />

              <label htmlFor="password" className="login-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="login-input"
                placeholder="Enter your password"
              />

              {selectedOption === "org" && (
                <>
                  <label htmlFor="pin" className="login-label">
                    Pin
                  </label>
                  <input
                    type="text"
                    id="pin"
                    className="login-input"
                    placeholder="Enter your pin"
                  />
                </>
              )}

              <div className="sel">
                <label htmlFor="mypos">User Type </label>
                <select
                  name="type"
                  id="mypos"
                  value={selectedOption} onChange={handleOptionChange}
                >
                  <option value="org">ORGANIZATION</option>
                  <option value="donator">DONATOR</option>
                </select>
              </div>

              <button type="submit" className="login-btn" onClick={handleSignUp}>
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Form;
