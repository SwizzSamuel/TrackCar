// src/contract.js
import { ethers } from 'ethers';
import {abi} from './constants'; // ABI file

const contractAddress = '0x4a0DFD41a09a1BC4CC0a33FD84F2C653217B0229'; 

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
