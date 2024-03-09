import { ethers } from "./ethers-5.6.esm.min.js";
import {abi,contractAddress} from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
const sendButton = document.getElementById("sendButton");
// const sendButton1 = document.getElementById("sendButton1");
// const sendButton2 = document.getElementById("sendButton2");
// const sendButton3 = document.getElementById("sendButton3");

connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;
sendButton.onclick = send;
// sendButton1.onclick = send;
// sendButton2.onclick = send;
// sendButton3.onclick = send;

let sendValue = "1000000000";
async function connect(){
    if(typeof(window.ethereum)!=="undefined"){
        console.log("Found Metamask")
       await window.ethereum.request({method : "eth_requestAccounts"});
       connectButton.innerHTML = "Connected";
    }
    else{
        connectButton.innerHTML = "Plese Install Metamask";
    }
}

async function fund(){
    const ethAmount = document.getElementById("EthAmount").value;
    console.log(`Funding with ${ethAmount}....`);
    if(typeof(window.ethereum)!=="undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress , abi , signer);
        try {
        const transactionResponse = await contract.fund({value : ethers.utils.parseEther(ethAmount)});
        await listenForTransactionMine(transactionResponse , provider);
        console.log("DONE!!!")
        } catch(error){
            console.log(error);
        }
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

async function getBalance(){
    if(typeof(window.ethereum)!=="undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(contractAddress);
        console.log(ethers.utils.formatEther(balance));

    }
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