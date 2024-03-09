const {getNamedAccounts , ethers, network} = require("hardhat");
const {assert , expect} = require("chai");
const {developmentChains} = require("../../helper-hardhat-config");

developmentChains.includes(network.name) 
? describe.skip
 : describe("FundMe", async function (){
    let fundMe;
    let deployer;
    const sendValue = "100000000";

    beforeEach(async function(){
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe" , deployer);
    })
    it("allows people to fund and withdraw", async function(){
        await fundMe.fund({value : sendValue});
        await fundMe.withdraw();
        const endingBalance = await ethers.provider.getBalance(fundMe.getAddress());
        assert.equal(endingBalance.toString(),"0");
    });

})