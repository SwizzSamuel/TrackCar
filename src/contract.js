// src/contract.js
import { ethers } from 'ethers';
import {abi} from './constants'; // ABI file

const contractAddress = '0xA8E08D49ead594054F85D545486BFE55abBa476E'; // Replace with your deployed contract address

export const getContract = async () => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        return contract;
    } else {
        alert('Please install MetaMask to use this app.');
    }
};
