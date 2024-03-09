// Get funds from users
// Withdraw them
//  Set a minimum funding value in USD

// SPDX-Licence-Identifier MIT    4:30
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    uint256 public constant MIN_USD = 0;
    address[] public funders;
    mapping(address => uint256) public addressToAmount;
    address public immutable i_owner;

    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAdress){
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAdress);
    }

    function fund () public payable {
        require(getConversionRate(msg.value , priceFeed) >= 0 , "Didn't send enough ");
        funders.push(msg.sender);
        addressToAmount[msg.sender]+=msg.value;
    }

    function getPrice ( AggregatorV3Interface priceFeed ) public view returns (uint256) {
        // AggregatorV3Interface pricefeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
        (,int256 price,,,) = priceFeed.latestRoundData();
        //  Eth in terms of usd
        return uint256( price * 1e10);
    }

    function getConversionRate (uint256 eth_amount , AggregatorV3Interface priceFeed) public view returns(uint256) {
        uint256 ethprice = getPrice(priceFeed);
        return (ethprice * eth_amount) / 1e18 ;
    }
    
    // function getVersion (AggregatorV3Interface priceFeed) public view returns (uint256){
    //     // AggregatorV3Interface pricefeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
    //     return priceFeed.version();
    // }
     function sendEth(address payable recipient, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance in the contract");
        recipient.transfer(amount);
    }

    function withdraw() public onlyOwner {

        for(uint256 i=0; i<funders.length; i++){
            address funder = funders[i];
            addressToAmount[funder]=0;
        }
        funders= new address[](0);      // reset the funders array 
        (bool callSuccess,) = payable(msg.sender).call{value : address(this).balance}("");
        require(callSuccess,"call failed");
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFunder(uint256 index) public view returns (address) {
        return funders[index];
    }

    modifier onlyOwner(){
        require(msg.sender == i_owner, "Sender not Owner");
        _;
    }

    receive() external payable {
        fund();
    }
    fallback() external payable {
        fund();
    }
}