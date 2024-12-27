// scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
    const SimpleGamblingGame = await ethers.getContractFactory("SimpleGamblingGame");
    const simpleGamblingGame = await SimpleGamblingGame.deploy();

    await simpleGamblingGame.deployed();

    console.log("SimpleGamblingGame deployed to:", simpleGamblingGame.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
