import Webcam from "react-webcam";
import { useRef, useState } from "react";
import "./cameraStyles.css";
import React from "react";
import { saveAs } from "file-saver";

const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return (new Blob([ab], { type: "image/png" }));
  };


const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageBlob = dataURItoBlob(imageSrc);
    saveAs(imageBlob, "webcam.png");
  }, [webcamRef]);

  return (
    <div className="webcam-container">
      <Webcam
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      />
      <div className="btn-container">
        {imgSrc ? (
          <button onClick={(e)=>{e.preventDefault();setImgSrc(null);}}>
            Retake photo
          </button>
        ) : (
          <button onClick={(e)=>{
            e.preventDefault();
            capture();
          }}>
            Capture photo
          </button>
        )}
      </div>
      {imgSrc && (
        <img src={imgSrc} alt="webcam" />
      )}
    </div>
  );
};

export default WebcamCapture;