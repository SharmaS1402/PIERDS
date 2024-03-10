// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ResourceAllocation {
    // Struct to represent details of resource allocation for a unique ID
    struct AllocationDetails {
        bool receivedRice;
        bool receivedClothes;
        bool receivedPulse;
        uint256 lastUpdateTimestamp;
    }

    // Mapping to store resource allocation details for each unique ID
    mapping(uint256 => AllocationDetails) public allocationMapping;

    event ResourceAllocated(uint256 indexed uniqueID, bool receivedRice, bool receivedClothes , bool receivedPulse);

    // Function to set resource allocation details for a unique ID
    function setResourceAllocation(uint256 uniqueID, bool _receivedRice, bool _receivedClothes , bool _receivedPulse) external {
        AllocationDetails storage details = allocationMapping[uniqueID];

        // Update allocation details
        details.receivedRice = _receivedRice;
        details.receivedClothes = _receivedClothes;
        details.receivedPulse = _receivedPulse;
        details.lastUpdateTimestamp = block.timestamp; // Store the current block timestamp

        emit ResourceAllocated(uniqueID, _receivedRice, _receivedClothes,_receivedPulse);
    }

    // Function to get resource allocation details for a unique ID
    function getResourceAllocation(uint256 uniqueID) external returns (bool, bool, bool) {
        AllocationDetails storage details = allocationMapping[uniqueID];

        // Reset allocation details after one Month
        bool isOneMonthPassed = block.timestamp > details.lastUpdateTimestamp + 30 days;

        // If one month has passed, reset allocation details
        if (isOneMonthPassed) {
            details.receivedRice = false;
            details.receivedClothes = false;
            details.receivedPulse = false;
        }

        return (details.receivedRice, details.receivedClothes, isOneMonthPassed);
    }
}
