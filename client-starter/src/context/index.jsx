import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {ethers} from "ethers";
import Web3Model from "web3modal";
import { useNavigate } from "react-router-dom";

import { ABI, ADDRESS } from "../contract";

const GlobalContext = createContext();
export const GlobalContextProvider = ({childeren}) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [provider, setProvider] = useState('');
    const [contract, setContract] = useState('');

    //set the wallet address to the state 
    const updateCurrentWalletAddress = async () => {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'});
            if (accounts)setWalletAddress(accounts[0]);
    }

    useEffect(() => {
        updateCurrentWalletAddress();

        window.ethereum.on('accountsChanged', updateCurrentWalletAddress);
    }, []);

    //* set the smart contract and provider to the state
    useEffect(() => {
        const setSmartContractAndProvider = async () => {
            const web3modal = new web3modal();
            const connection = await web3modal.connect();
            const newProvider = new ethers.providers.Web3Provider(connection);
            const signer = newProvider.signer();
            const newContract = new ethers.Contract(ADDRESS, ABI,signer);
            setProvider(newProvider);
            setContract(newContract);
        }
        setSmartContractAndProvider();
    }, []);

    return (

        <GlobalContext.Provider value={{
            contract, walletAddress
        }}>

        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);