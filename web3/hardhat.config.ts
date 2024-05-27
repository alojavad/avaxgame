import dotenv from 'dotenv';
import '@nomiclabs/hardhat-ethers';

dotenv.config();

//* Notes for deploying the smart contract on your own subnet
//* More info on subnets: https://docs.avax.network/subnets
//* Why deploy on a subnet: https://docs.avax.network/subnets/when-to-use-subnet-vs-c-chain
//* How to deploy on a subnet: https://docs.avax.network/subnets/create-a-local-subnet
//* Transactions on the C-Chain might take 2-10 seconds -> the ones on the subnet will be much faster
//* On C-Chain we're relaying on the Avax token to confirm transactions -> on the subnet we can create our own token
//* You are in complete control over the network and it's inner workings

export default {
  solidity: {
    version: '0.8.20',
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 25500000000,
      chainId: 43113,
      accounts: ["0x9f0a9a9401f8515a165b1e7540af3873b325b908f5953b0e2df034f2599dcb3d", "0x9802f10c29c5afc69555871c47bf21588d977deea1f8d264f5b8e23376a7cf70"] // Your private keys
      ,
      gas: 5000000 // Set your desired gas limit here
    },
    sepolia: {
      url: 'https://ethereum-sepolia.publicnode.com',
      gasPrice: 25500000000,
      chainId: 11155111,
      accounts: ["0x9f0a9a9401f8515a165b1e7540af3873b325b908f5953b0e2df034f2599dcb3d", "0x9802f10c29c5afc69555871c47bf21588d977deea1f8d264f5b8e23376a7cf70"] // Your private keys
      ,
      gas: 5000000 // Set your desired gas limit here
    },
    // subnet: {
    //   url: process.env.NODE_URL,
    //   chainId: Number(process.env.CHAIN_ID),
    //   gasPrice: 'auto',
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
}
