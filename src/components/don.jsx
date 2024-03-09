import React, { useState } from "react";
import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";
import "./NameAndButtons.css";

const NameAndButtons = () => {
  const [connected, setConnected] = useState(false);
  const [fundingAmount, setFundingAmount] = useState("");

  const handleButtonClick = async (buttonName) => {
    if (buttonName === "METAMASK CONNECTED") {
      await connect();
    } else if (buttonName === "FUND") {
      await fund();
    }
  };

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("Found Metamask");
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnected(true);
      } catch (error) {
        console.error(error);
        setConnected(false);
      }
    } else {
      console.error("Please Install Metamask");
      setConnected(false);
    }
  };

  const fund = async () => {
    console.log(`Funding with ${fundingAmount}....`);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const transactionResponse = await contract.fund({
          value: ethers.utils.parseEther(fundingAmount),
        });
        await listenForTransactionMine(transactionResponse, provider);
        console.log("DONE!!!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const listenForTransactionMine = (transactionResponse, provider) => {
    console.log(`Mining ${transactionResponse.hash}...`);
    return new Promise((resolve, reject) => {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations`
        );
        resolve();
      });
    });
  };

  return (
    <div className="main">
      <div className="container">
        <div className="name">PIERDS</div>
      </div>
      <div class="un">
        <div class="org"> !! WELCOME DONATOR!!</div>
      </div>
      <div className="org2">FUNDING NIT HAMIRPUR</div>
      <div className="mainbutton">
        <div className="buttons">
          <label className="lab" htmlFor="fundingAmount">
            Enter the amount to fund:
          </label>
          <input
            className="text"
            type="number"
            id="EthAmount"
            name="fundingAmount"
            placeholder="Enter amount"
            required
            value={fundingAmount}
            onChange={(e) => setFundingAmount(e.target.value)}
          ></input>
          <button
            className="connect"
            id="connectButton"
            onClick={() => handleButtonClick("METAMASK CONNECTED")}
          >
            {connected ? "CONNECTED" : "CONNECT TO METAMASK"}
          </button>
          <button
            className="fund"
            id="fundButton"
            onClick={() => handleButtonClick("FUND")}
          >
            FUND
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameAndButtons;
