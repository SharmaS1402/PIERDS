const {getNamedAccounts,ethers} = require("hardhat");

async function main(){
    const sendValue = "10000000000";
    const {deployer} = await getNamedAccounts();
    const fundMe = await ethers.getContract("FundMe" , deployer);
    console.log("funding contract");
    const transactionResponse = await fundMe.fund({value : sendValue});
    await transactionResponse.wait(1);
    console.log("funded.");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });