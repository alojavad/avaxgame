import { ethers } from 'hardhat';
import console from 'console';

const _metadataUri = 'https://gateway.pinata.cloud/ipfs/https://gateway.pinata.cloud/ipfs/QmX2ubhtBPtYw75Wrpv6HLb1fhbJqxrnbhDo1RViW3oVoi';

async function deploy(name: string, ...params: [string]) {
  const contractFactory = await ethers.getContractFactory(name);

  return await contractFactory.deploy(...params).then((f) => f.deployed());
}

async function main() {
  const metadataURI = "https://example.com/metadata";
  const tokenAddress = "0x9D58b1a574bE037dBE18CBae0A6BfeCbD2D0D376";
  const commisionAddress = "0xC069a4ffa84e4A908C72548B8b23Fa233E87eb5c";

  // Deploy the contract
  const Contract = await ethers.getContractFactory("AVAXGods");
  const contract = await Contract.deploy(metadataURI, tokenAddress, commisionAddress);

  await contract.deployed();

  console.log("Contract deployed to address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  });
