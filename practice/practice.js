import { abi, contractAddress } from "./constants.js";
import { ethers } from "./ethers-5.6.esm.min.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;


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