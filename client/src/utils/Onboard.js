/* eslint-disable prefer-destructuring */
import Web3Modal from 'web3modal';

// function isEthereum() {
//   if (window.ethereum) {
//     return true;
//   }
//   return false;
// }

// Create a providerOptions object
const providerOptions = {
  /* Specify your provider options here */
};

// Create a new instance of Web3Modal
const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

async function isEthereum() {
  const provider = await web3Modal.connect();
  if (provider) {
    return true;
  }
  return false;
}

// function getChainID() {
//   if (isEthereum()) {
//     return parseInt(window.ethereum.chainId, 16);
//   }
//   return 0;
// }

async function getChainID() {
  const provider = await web3Modal.connect();
  if (provider) {
    return parseInt(provider.chainId, 16);
  }
  return 0;
}

// async function handleConnection(accounts) {
//   if (accounts.length === 0) {
//     const fetchedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//     return fetchedAccounts;
//   }

//   return accounts;
// }

async function handleConnection(accounts) {
  const provider = await web3Modal.connect();
  if (accounts.length === 0) {
    const fetchedAccounts = await provider.request({ method: 'eth_requestAccounts' });
    return fetchedAccounts;
  }

  return accounts;
}

// async function requestAccount() {
//   let currentAccount = 0x0;
//   if (isEthereum() && getChainID() !== 0) {
//     let accounts = await window.ethereum.request({ method: 'eth_accounts' });
//     accounts = await handleConnection(accounts);
//     currentAccount = accounts[0];
//   }
//   return currentAccount;
// }

async function requestAccount() {
  let currentAccount = 0x0;
  const provider = await web3Modal.connect();
  if (provider && getChainID() !== 0) {
    let accounts = await provider.request({ method: 'eth_accounts' });
    accounts = await handleConnection(accounts);
    currentAccount = accounts[0];
  }
  return currentAccount;
}

// async function requestBalance(currentAccount) {
//   let currentBalance = 0;
//   if (isEthereum()) {
//     try {
//       currentBalance = await window.ethereum.request({
//         method: 'eth_getBalance',
//         params: [currentAccount, 'latest'],
//       });

//       currentBalance = parseInt(currentBalance, 16) / 1e18;

//       return { currentBalance, err: false };
//     } catch (err) {
//       return { currentBalance, err: true };
//     }
//   }
//   return { currentBalance, err: true };
// }

async function requestBalance(currentAccount) {
  let currentBalance = 0;
  const provider = await web3Modal.connect();
  if (provider) {
    try {
      currentBalance = await provider.request({
        method: 'eth_getBalance',
        params: [currentAccount, 'latest'],
      });

      currentBalance = parseInt(currentBalance, 16) / 1e18;

      return { currentBalance, err: false };
    } catch (err) {
      return { currentBalance, err: true };
    }
  }
  return { currentBalance, err: true };
}

export const GetParams = async () => {
  const response = {
    isError: false,
    message: '',
    step: -1,
    balance: 0,
    account: '0x0',
  };

  if (!isEthereum()) {
    response.step = 0;
    return response;
  }

  const currentAccount = await requestAccount();
  if (currentAccount === 0x0) {
    response.step = 1;
    return response;
  }

  response.account = currentAccount;

  // if (getChainID() !== 43113) {
  // // if (getChainID() !== 11155111) {
  //   response.step = 2;
  //   return response;
  // }

  const { currentBalance, err } = await requestBalance(currentAccount);
  if (err) {
    response.isError = true;
    response.message = 'Error fetching balance!';
    return response;
  }
  response.balance = currentBalance;

  if (currentBalance < 0.2) {
    response.step = 3;
    return response;
  }

  return response;
};

export async function SwitchNetwork() {
  await window?.ethereum?.request({
    method: 'wallet_addEthereumChain',
    params: [{
      chainId: '0xA869',
      chainName: 'Fuji C-Chain',
      nativeCurrency: {
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18,
      },
      rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
      blockExplorerUrls: ['https://testnet.snowtrace.io'],
    }],
  }).catch((error) => {
    console.log(error);
  });
}
