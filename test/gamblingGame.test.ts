// test/gamblingGame.test.ts
import { ethers } from "hardhat";
import { expect } from "chai";

describe("SimpleGamblingGame", function () {
    let gamblingGame: any;

    before(async () => {
        const SimpleGamblingGame = await ethers.getContractFactory("SimpleGamblingGame");
        gamblingGame = await SimpleGamblingGame.deploy();
        await gamblingGame.deployed();
        console.log("  - deployed at: ", gamblingGame.address);
    });

    // Function to introduce a delay
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));    

    const displayResults = async () => {

        // Check the total pot
        const seed = (await gamblingGame.seed()).toString();
        const winningNumber = (await gamblingGame.winningNumber()).toString();
        console.log("  seed: ", seed);
        console.log("  winning number:", winningNumber);

        // Get the length of the lastWinners array
        const winnersCount = await gamblingGame.getLastWinnersCount();

        // Display each address in the lastWinners array
        console.log("  Winners:", winnersCount.toString());
        for (let i = 0; i < winnersCount; i++) {
            const winner: string = await gamblingGame.lastWinners(i); // Call the getter for each index
            console.log(`  Winner ${i + 1}: ${winner}`);
        }

        console.log("  last total Pot: ", (await gamblingGame.lastPot()).toString());

        const [player1, player2, player3] = await ethers.getSigners();
        // Get balances in wei
        const balance1 = await ethers.provider.getBalance(player1.address);
        const balance2 = await ethers.provider.getBalance(player2.address);
        const balance3 = await ethers.provider.getBalance(player3.address);
        const balance4 = await ethers.provider.getBalance(gamblingGame.address);

        // Display balances in wei
        console.log(`Balance of Player 1 (${player1.address}): ${balance1.toString()} wei`);
        console.log(`Balance of Player 2 (${player2.address}): ${balance2.toString()} wei`);
        console.log(`Balance of Player 3 (${player3.address}): ${balance3.toString()} wei`);
        console.log(`Balance of Contract (${gamblingGame.address}): ${balance4.toString()} wei`);

    };

    it("should display 3 players", async function () {
        const [player1, player2, player3] = await ethers.getSigners();

        console.log("  - player1", player1.address);
        console.log("  - player2", player2.address);
        console.log("  - player3", player3.address);

        // Start the game
        await gamblingGame.startGame();
        console.log("  - startGame");
    });

    it("should execute a first round", async function () {
        const [player1, player2, player3] = await ethers.getSigners();

        console.log("\n  - start round ", (await gamblingGame.roundNumber()).toString() );

        // Players place their bets
        await gamblingGame.connect(player1).placeBet(7, { value: ethers.utils.parseEther("0.0001") });
        await gamblingGame.connect(player2).placeBet(4, { value: ethers.utils.parseEther("0.0001") });
        await gamblingGame.connect(player3).placeBet(15, { value: ethers.utils.parseEther("0.0001") });

        await delay(1000); // 1 second delay
        await displayResults();
    });

    it("should execute a second round", async function () {
        const [player1, player2, player3] = await ethers.getSigners();

        console.log("\n  - start round ", (await gamblingGame.roundNumber()).toString() );

        // Players place their bets
        await gamblingGame.connect(player1).placeBet(4, { value: ethers.utils.parseEther("0.0001") });
        await gamblingGame.connect(player2).placeBet(7, { value: ethers.utils.parseEther("0.0002") });
        await gamblingGame.connect(player3).placeBet(15, { value: ethers.utils.parseEther("0.0003") });

        await delay(1000); // 1 second delay
        await displayResults();
    });

    it("should execute a third round", async function () {
        const [player1, player2, player3] = await ethers.getSigners();

        console.log("\n  - start round ", (await gamblingGame.roundNumber()).toString() );

        // Players place their bets
        await gamblingGame.connect(player1).placeBet(4, { value: ethers.utils.parseEther("0.0001") });
        await gamblingGame.connect(player2).placeBet(13, { value: ethers.utils.parseEther("0.0001") });
        await gamblingGame.connect(player3).placeBet(15, { value: ethers.utils.parseEther("0.0001") });

        await delay(1000); // 1 second delay
        await displayResults();
    });

    it("should execute a fourth round", async function () {
        const [player1, player2, player3] = await ethers.getSigners();

        console.log("\n  - start round ", (await gamblingGame.roundNumber()).toString() );

        // Players place their bets
        await gamblingGame.connect(player1).placeBet(4, { value: ethers.utils.parseEther("0.0001") });
        await gamblingGame.connect(player2).placeBet(7, { value: ethers.utils.parseEther("0.0001") });
        await gamblingGame.connect(player3).placeBet(15, { value: ethers.utils.parseEther("0.0001") });

        await delay(1000); // 1 second delay
        await displayResults();
    });

});