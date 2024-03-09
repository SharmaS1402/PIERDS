import "./Candidate.css";

const Portt = () => {
  return (
    <div className="container">
      <div className="candidate" >
        <div className="candidate-info">
          <div className="name-age">
            <div className="name"></div>
            <div className="age"></div>
          </div>
          <div className="id">ID: </div>
        </div>
        <div className="token-left">
          <div className="label">Tokens Left:</div>
          <div className="value"></div>
        </div>
      </div>

      <div className="checkbox-container">
        <div className="checkbox-box">
          <label htmlFor="rice">Rice:</label>
          <input type="checkbox" id="rice" name="rice" />
        </div>
        <div className="checkbox-box">
          <label htmlFor="pulses">Pulses:</label>
          <input type="checkbox" id="pulses" name="pulses" />
        </div>
      </div>
    </div>
  );
}

export default Portt