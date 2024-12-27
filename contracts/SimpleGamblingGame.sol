// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleGamblingGame {
    address[] public players; // Array to store player addresses
    address[] public lastWinners;
    uint8[] public chosenNumbers; // Array to store player numbers
    uint256 public totalPot;
    uint256 public seed; // Pseudo Fibonacci seed
    uint8 public playerCount;
    uint256 public roundNumber;
    uint256 public lastPot;
    uint8 public winningNumber;

    event GameStarted();
    event GameEnded(uint256 round, address[] winners, uint256 amountWon);
    event BetPlaced(address player, uint256 amount, uint8 chosenNumber);

    constructor() {
        seed = 2; // Initialize seed
        roundNumber = 0; // Start round number at 0
    }

    function startGame() external {
        require(playerCount == 0, "Game already started");
        resetGame();
        emit GameStarted();
    }

    function placeBet(uint8 chosenNumber) external payable {
        require(chosenNumber >= 0 && chosenNumber <= 15, "Chosen number must be between 0 and 15");
        require(msg.value >= 0.0001 ether && msg.value <= 0.001 ether, "Bet must be between 0.0001 and 0.001 ETH");

        players.push(msg.sender);
        chosenNumbers.push(chosenNumber); // Store the chosen number        
        totalPot += msg.value; // Update the total pot
        playerCount++;

        emit BetPlaced(msg.sender, msg.value, chosenNumber);

        if (playerCount == 3) {
            determineWinner(); // Call to determine the winner
        }
    }

    function determineWinner() internal {
        // Calculate the next Fibonacci number
        uint256 fib = getNextFibonacci(seed);
        seed = fib; // Update seed

        // Get the hash of the seed
        bytes32 hash = keccak256(abi.encodePacked(fib));
        winningNumber = uint8(uint8(hash[0]) % 16); // Get the first byte and map it to 0-15

        //empty the last winners array
        delete lastWinners;

        // Determine the closest player(s)
        uint8 closestDifference = 16; // Max difference is 15

        // get the min difference
        for (uint8 i = 0; i < players.length; i++) {
            uint8 difference = abs(uint8(chosenNumbers[i]), winningNumber);
            if (difference < closestDifference) {
                closestDifference = difference;
            }
        }

        for (uint8 i = 0; i < players.length; i++) {
            uint8 difference = abs(uint8(chosenNumbers[i]), winningNumber);
            if (difference == closestDifference) {
                lastWinners.push(players[i]);
            }
        }

        // Transfer the total pot to the winners
        uint256 prizePerWinner = totalPot / lastWinners.length;
        for (uint8 i = 0; i < lastWinners.length; i++) {
            (bool success, ) = lastWinners[i].call{value: prizePerWinner}("");
            require(success, "Transfer failed");
        }

        // Update last winner and last pot
        lastPot = totalPot; // Store the total pot of the last round

        emit GameEnded(roundNumber, lastWinners, prizePerWinner);

        // Reset the game
        resetGame();
    }

    function resetGame() internal {
        delete players; // Clear the players array
        delete chosenNumbers;
        totalPot = 0;
        playerCount = 0;
        roundNumber++; // Increment the round number
    }

    function getLastWinnersCount() external view returns (uint256) {
        return lastWinners.length;
    }

    function getNextFibonacci(uint256 current) internal pure returns (uint256) {
        // Simple Fibonacci calculation
        if (current == 1) return 1; // Return 1 for the next Fibonacci number
        return current + (current - 1); // Return the next Fibonacci number
    }

    function abs(uint8 x, uint8 y) internal pure returns (uint8) {
        if (x >= y) {
            return x - y;
        } else {
            return y - x;
        }
    }

    // Fallback function to receive ETH
    receive() external payable {}
}