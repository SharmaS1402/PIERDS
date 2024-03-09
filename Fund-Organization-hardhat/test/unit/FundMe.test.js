const {deployments , ethers, getNamedAccounts} = require("hardhat");
const {assert , expect} = require("chai");
const {developmentChains} = require("../../helper-hardhat-config");

!developmentChains.includes(network.name) 
? describe.skip
: describe("FundMe", async function(){
    let fundMe;
    let deployer;
    let mockV3Aggregator;
    const sendValue = "1000000000000000000";

    beforeEach(async function(){
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        fundMe = await ethers.getContract("FundMe" , deployer);
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator" , deployer);
    })

    describe("constructor", async function () {
        it("sets the aggregator addresses correctly " , async function(){
            let Response = await fundMe.priceFeed();
            assert.equal(Response ,await mockV3Aggregator.getAddress());
        })
    })

    describe("fund", async function(){
        it("Fails if you don't send enough ETH", async function(){
            await expect(fundMe.fund()).to.be.revertedWith("Didn't send enough ");
        })
        it("updated the amount funded data structure ",async function (){
            await fundMe.fund({value : sendValue});
            const response = await fundMe.addressToAmount(deployer);
            assert.equal(response.toString(),sendValue.toString());
        })
        it("add funders to array funder", async function (){
            await fundMe.fund({value : sendValue});
            const funder = await fundMe.funders(0);
            assert.equal(funder , deployer);
        })
    })

    describe("withdraw", async function(){
        beforeEach(async function(){
            await fundMe.fund({value : sendValue});
        })
        it("withdraw eth from a single funder " , async function(){
            const startingFundMeBalance =BigInt( await ethers.provider.getBalance(await fundMe.getAddress()));
            const startingDeployerBalance =BigInt( await ethers.provider.getBalance(deployer));

            const transactionResponse = await fundMe.withdraw();
            const transactionReceipt = await transactionResponse.wait(1);
            const {gasUsed , gasPrice} = transactionReceipt;
            const effectiveGasPrice = gasPrice;
            const gasCost = BigInt(gasUsed ) * BigInt(effectiveGasPrice);

            const endingFundMeBalance =BigInt( await ethers.provider.getBalance(await fundMe.getAddress()));
            const endingDeployerBalance =BigInt( await ethers.provider.getBalance(deployer));

            assert.equal(endingFundMeBalance , 0);
            assert.equal((endingDeployerBalance + gasCost).toString() , (startingFundMeBalance + startingDeployerBalance).toString());
        })

        it("allows us to withdraw with multiple funders" , async function (){
            const accounts = await ethers.getSigners();
            for( let i=1;i<6;i++){
                const fundMeConnectedContract = await fundMe.connect(
                    accounts[i]
                )
                await fundMeConnectedContract.fund({value : sendValue});
            }
            const startingFundMeBalance =BigInt( await ethers.provider.getBalance(await fundMe.getAddress()));
            const startingDeployerBalance =BigInt( await ethers.provider.getBalance(deployer));

            const transactionResponse = await fundMe.withdraw();
            const transactionReceipt = await transactionResponse.wait(1);
            const {gasUsed , gasPrice} = transactionReceipt;
            const effectiveGasPrice = gasPrice;
            const gasCost = BigInt(gasUsed ) * BigInt(effectiveGasPrice);

            await expect(fundMe.funders(0)).to.be.reverted
            for(i = 1;i<6;i++){
                assert.equal(await fundMe.addressToAmount(accounts[i].address),0);
            }
        })

        it("only allows the owner to withdraw", async function (){
            const accounts =await  ethers.getSigners();
            const attacker = accounts[1];
            const attackerConnectedContract = await fundMe.connect(attacker);
            await expect(attackerConnectedContract.withdraw()).to.be.reverted;
        })
    })

    
})