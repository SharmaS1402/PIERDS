import { useNavigate } from "react-router-dom";
import { abi, contractAddress } from "../constants";
import { ethers } from "../ethers-5.6.esm.min";

import "./Organisation.css";

const Organisation = () => {
  const navigate=useNavigate();
  let sendValue = "10000000000";
  async function send(){
    if(typeof(window.ethereum)!=="undefined"){
        console.log("sending.....");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress , abi , signer);
        const recepientAddress = "0x1630147673F7D8c4d0CE19670bd53319161d1AB6";
        const sendAmount = sendValue;
        await contract.sendEth(recepientAddress , sendAmount);
    }
}


  async function getBalance(contractAddress){
    if(typeof(window.ethereum)!=="undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(contractAddress);
        return ethers.utils.formatEther(balance);

    }
}
function listenForTransactionMine(transactionResponse , provider){
  console.log(`Mining ${transactionResponse.hash}...`)
  return new Promise((resolve , reject)=> {

      provider.once(transactionResponse.hash , (transactionReceipt) => {
          console.log(`Completed with ${transactionReceipt.confirmations} confirmations`)
          resolve()
      });
  })
}

async function withdraw(){
  if(typeof(window.ethereum)!=="undefined"){
      console.log("withdrawing.....")
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress , abi , signer);
      console.log(await contract.getOwner());
      try{
          const transactionResponse = await contract.withdraw();
          await listenForTransactionMine(transactionResponse , provider);
      } catch(error){
          console.log(error);
      }
  }
}

  const handleButtonClick= async ()=>{
    const balance = await getBalance('your_contract_address_here');
    alert('Balance:', balance);
   
    
  }
  const handleButton=async ()=>{
    const contactt=await withdraw("withdraw");
    alert("withrawn",contactt);
    
  }
  return (
    <>
    <div className="hell">
    <div className="header"><h1>PIERDS</h1></div>

    <div className="container" >
   
        <button className="balance"  id="balanceButton" onClick={handleButtonClick}>Balance</button>
        <button className="withdraw" id="withdrawButton" onClick={handleButton}>Withdraw</button>
        <div className="container1">
    <h1 className="hello">Refugee List</h1>

    <div className="refugee">
        <span>Name    :    John Doe</span>
        <button className="send-button" id="sendButton1" onClick={send}>Send</button>
    </div>

    <div className="refugee">
        <span>Name     :    Jane Sha</span>
        <button className="send-button" id="sendButton2" onClick={send}>Send</button>
    </div>

    <div className="refugee">
        <span>Name      :    Sham Ali</span>
        <button className="send-button" id="sendButton3" onClick={send}>Send</button>
    </div>
</div>
    </div>
    </div>
    </>
    
  )
}

export default Organisation