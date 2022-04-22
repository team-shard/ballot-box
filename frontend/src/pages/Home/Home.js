import Button from '../../components/button/Button'
import './Home.css'
import {Contract} from 'ethers';

import React, { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import Control from "../../contracts/AccessControl.json";

export default function Home() {
  const[isWalletConnected,setIsWalletConnected] = useState(false);
  const [customerAddress, setCustomerAddress] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setUser] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setIsWalletConnected(true);
        setCustomerAddress(account);
        console.log("Account Connected: ", account);
      } else {
        setError("Please install a MetaMask wallet to use our bank.");
        console.log("No Metamask detected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getUserRole = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const controlContract = new ethers.Contract(0x6A08244EF41483B197847630709919BE209135A5, Control.abi, signer);
  
        let role = await controlContract.getUserRole(signer);
        setUser(role);
        console.log(role);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getData = async () => {

        getUserRole();

    };
    getData().then(() => {});
  });
  return (
    <div className='Home'> 
     <header className="App-header">
    <span href='/' className='logo'>Zuri.</span>
    <nav>
      <a href="/">Home</a>
      {/* {isWalletConnected && <p><span className="font-bold">Your Wallet Address: </span>{customerAddress}</p>} */}
      {/* addressShortner(customerAddress); */}
      {/* <p> <span>{isWalletConnected }{customerAddress}</span></p> */}
      
      
    </nav>
  </header>

    <h1>The <span>No. 1 </span> <br/>
    World Class Organisation where tech talents are brewed
    </h1>
    <p> Register now to kickstart your career
    </p>
   <Button text={isWalletConnected ? "Wallet Connected 🔒" : "Connect Wallet 🔑"} handleClick={checkIfWalletIsConnected} /> 
    </div>

  )
}
