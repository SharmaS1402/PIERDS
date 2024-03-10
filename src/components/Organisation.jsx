import { useNavigate } from "react-router-dom";
import { abi, contractAddress } from "../constants";
import { ethers } from "../ethers-5.6.esm.min";

import "./Organisation.css";

const Organisation = () => {
  const navigate = useNavigate();
  let sendValue = "10000000000";
  async function send() {
    if (typeof window.ethereum !== "undefined") {
      console.log("sending.....");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const recepientAddress = "0x1630147673F7D8c4d0CE19670bd53319161d1AB6";
      const sendAmount = sendValue;
      await contract.sendEth(recepientAddress, sendAmount);
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(contractAddress);
      return ethers.utils.formatEther(balance);
    }
  }
  function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`);
    return new Promise((resolve, reject) => {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations`
        );
        resolve();
      });
    });
  }

  async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
      console.log("withdrawing.....");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      console.log(await contract.getOwner());
      try {
        const transactionResponse = await contract.withdraw();
        await listenForTransactionMine(transactionResponse, provider);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleButtonClick = async () => {
    const balance = await getBalance(contractAddress);
    console.log(balance);
    alert(`BALANCE : ${balance}`);
    <li>
      <a href="../">GALLERY</a>
    </li>;
  };
  const handleButton = async () => {
    const contactt = await withdraw("withdraw");
    alert("MONEY SUCCESSFULLY MOVED TO ORGANIZATION WALLET", contactt);
  };
  const handleButtondis = async () => {
    const contactt = await distribute("distribute");
    alert(`open camera`);
  };
  return (
    <>
      <div className="hell">
        <div className="container3">
          <div className="name3">PIERDS</div>
        </div>

        <div className="container4">
          <div className="cp">
            <button
              className="balance"
              id="balanceButton"
              onClick={handleButtonClick}
            >
              Balance
            </button>
            <button
              className="withdraw"
              id="withdrawButton"
              onClick={handleButton}
            >
              Withdraw
            </button>
            <button
              className="distribute"
              id="distributebutton"
              onClick={handleButtondis}
            >
              Distribute
            </button>
          </div>
          <div className="container1">
            <h2 className="hello">Refugee List</h2>

            <div className="refugee">
              <p1>Name: </p1>
              <p1>John Doe</p1>
              <button className="send-button" id="sendButton1" onClick={send}>
                Send
              </button>
              <p1 className="ds">ADDRESS1</p1>
            </div>

            <div className="refugee">
              <p1>Name: </p1>
              <p1>Jane Sha</p1>
              <button className="send-button" id="sendButton2" onClick={send}>
                Send
              </button>
              <p1 className="ds">ADDRESS2</p1>
            </div>

            <div className="refugee">
              <p1>Name: </p1>
              <p1>Jane Sha</p1>
              <button className="send-button" id="sendButton3" onClick={send}>
                Send
              </button>
              <p1 className="ds">ADDRESS3</p1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organisation;
