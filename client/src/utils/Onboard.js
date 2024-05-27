/* eslint-disable prefer-destructuring */
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { useWeb3Modal } from '@web3modal/ethers5/react'
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import Web3Modal from "web3modal";
import { ethers } from "ethers"


// 1. Get projectId
const projectId = 'c973d6ef98abcd6c37a2d85593b98159'

// Define the network
const fujiCChain = {
  chainId: 43113, // Chain ID for Fuji C-Chain
  name: 'Fuji C-Chain',
};

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const sepolia = {
  chainId: 11155111, // Chain ID for Sepolia
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia-explorer.optimism.io', // Sepolia Block Explorer URL
  rpcUrl: 'https://sepolia.optimism.io' // Sepolia RPC URL
}

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [fujiCChain, mainnet, sepolia],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

async function getBalance() {
  const web3Modal = new Web3Modal();
  const provider = await web3Modal.connect();
  const ethersProvider = new ethers.providers.Web3Provider(provider);

  const signer = ethersProvider.getSigner();
  const account = await signer.getAddress();
  const balance = await ethersProvider.getBalance(account);

  console.log(`The balance of ${account} is ${ethers.utils.formatEther(balance)} ETH`);
  // return balance;
}


export const GetParams = async () => {
  console.log("selectedNetworkId22");
  const response = {
    isError: false,
    message: '',
    step: -1,
    balance: 0,
    account: '0x0',
  };
  SwitchNetwork();
  
  const { open, close } = useWeb3Modal()
  const { isConnected } = useWeb3ModalAccount();
  // const { address, chainId, isConnected } = useWeb3ModalAccount()
  // const { walletProvider } = useWeb 3ModalProvider()

  console.log("1");
  if (!isConnected) {
    console.log("2");
    getBalance().catch(console.error);
    open()
    console.log("3");
    }
    


  return response;
};

export async function SwitchNetwork() {
  const { provider } = useWeb3Modal();

    // Get the signer
    const signer = provider && new ethers.providers.Web3Provider(provider).getSigner();

    signer.provider.send('wallet_addEthereumChain', [{
      chainId: '0x539', // Sepolia Testnet Chain ID
      chainName: 'Sepolia',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://sepolia.optimism.io'], // Sepolia RPC URL
      blockExplorerUrls: ['https://sepolia-explorer.optimism.io'], // Sepolia Block Explorer URL
    }]).catch((error) => {
      console.log(error);
    });
  }
