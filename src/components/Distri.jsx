// Distri.jsx

import React, { useState } from "react";
import "./Distri.css";

const Distri = () => {
  const [additionalBoxes, setAdditionalBoxes] = useState({});
  const [box1Checked, setBox1Checked] = useState(false);

  const handleButtonClick = (boxNumber) => {
    if (boxNumber === 1) {
      // For box 1, toggle the checkbox state
      setBox1Checked((prev) => !prev);
    } else {
      alert(`SUCCESSFULL SUPPLIES DONATED `);

      // Update state to associate new boxes with the clicked box
      setAdditionalBoxes((prevBoxes) => ({
        ...prevBoxes,
        [boxNumber]: newBoxes,
      }));
    }
  };

  return (
    <div className="page">
      <div className="container5">
        <div className="name5">PIERDS</div>
      </div>
      <div className="qp">
        <button className="box1" id="box1" onClick={() => handleButtonClick(1)}>
          Get Record
        </button>
      </div>
      {box1Checked && (
        <div className="yu">
          {/* Display checkboxes and content for box 1 */}
          <label>
            <input type="checkbox" />
            Rice
          </label>
          <label>
            <input type="checkbox" />
            Pulses
          </label>
          <label>
            <input type="checkbox" />
            Clothes
          </label>
        </div>
      )}
      <div className="qp">
        <button className="box2" id="box2" onClick={() => handleButtonClick(2)}>
          Allocate
        </button>
      </div>
    </div>
  );
};

export default Distri;
