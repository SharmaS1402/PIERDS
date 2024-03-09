import React, { useState } from "react";
import "./style.css";

const Form = () => {
  const [selectedType, setSelectedType] = useState("org");

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="login-container">
      <div>
        <h1> WELCOME TO PIERDS!!!</h1>
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

            {selectedType === "org" && (
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
              <label htmlFor="mypos">User Type</label>
              <select
                name="type"
                id="mypos"
                value={selectedType}
                onChange={handleTypeChange}
              >
                <option value="org">ORGANIZATION</option>
                <option value="DON">DONATOR</option>
              </select>
            </div>

            <button type="submit" className="login-btn">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
