import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, artifacts } from "hardhat";

describe("AvaxGods", function () {
  let AvaxGods;

  let account1, account2;
  
  before(async function () {
    // The address of your deployed contract
    const deployedAddress = "0x85a5Be905D5EDe5eF860D29DA44C72FDF3739ae2";

    // The ABI of your Contract
    const AvaxGodsArtifact = await artifacts.readArtifact("AVAXGods");
    const ABI = AvaxGodsArtifact.abi;

    AvaxGods = new ethers.Contract(deployedAddress, ABI, ethers.provider);

    // Create two accounts with hardcoded private keys
    const privateKey1 = "0x9f0a9a9401f8515a165b1e7540af3873b325b908f5953b0e2df034f2599dcb3d";
    const privateKey2 = "0x9802f10c29c5afc69555871c47bf21588d977deea1f8d264f5b8e23376a7cf70";

    account1 = new ethers.Wallet(privateKey1, ethers.provider);
    account2 = new ethers.Wallet(privateKey2, ethers.provider);
  });
  describe("registerPlayer", function () {
    it("should register player one", async function () {
      const name = "player1";
      const gameTokenName = "player1";

      // Call the registerPlayer function
      const tx = await AvaxGods.connect(account1).registerPlayer(name, gameTokenName);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      // Check if the NewPlayer event was emitted
      expect(receipt.events).to.satisfy(anyValue(
        (ev) => ev.event === "NewPlayer" && ev.args[0] === account1.address && ev.args[1] === name
      ));

      // Check if the player was registered correctly
      const playerId = await avaxGods.playerInfo(account1.address);
      const player = await avaxGods.players(playerId);

      expect(player.addr).to.equal(account1.address);
      expect(player.name).to.equal(name);
      expect(player.level).to.equal(10);
      expect(player.attackPower).to.equal(25);
      expect(player.isBoss).to.equal(false);
    });

    // it("should register player two", async function () {
    //   const name = "player2";
    //   const gameTokenName = "player2";

    //   // Call the registerPlayer function
    //   const tx = await AvaxGods.connect(account2).registerPlayer(name, gameTokenName);

    //   // Wait for the transaction to be mined
    //   const receipt = await tx.wait();

    //   // Check if the NewPlayer event was emitted
    //   expect(receipt.events).to.satisfy(anyValue(
    //     (ev) => ev.event === "NewPlayer" && ev.args[0] === account1.address && ev.args[1] === name
    //   ));

    //   // Check if the player was registered correctly
    //   const playerId = await avaxGods.playerInfo(account2.address);
    //   const player = await avaxGods.players(playerId);

    //   expect(player.addr).to.equal(account2.address);
    //   expect(player.name).to.equal(name);
    //   expect(player.level).to.equal(10);
    //   expect(player.attackPower).to.equal(25);
    //   expect(player.isBoss).to.equal(false);
    // });

    // it("should fail when trying to register an already registered player", async function () {
    //   const name = "Test Player";
    //   const gameTokenName = "Test Game Token";

    //   // Try to register the same player again
    //   const tx = avaxGods.connect(account1).registerPlayer(name, gameTokenName);

    //   // Check if the transaction fails with the correct error message
    //   await expect(tx).to.be.revertedWith("Player already registered");
    // });
  });
});
