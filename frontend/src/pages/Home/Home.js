import Button from '../../components/button/Button'
import './Home.css'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import abi from '../../contracts/ShardDAO.json';
import {Link} from 'react-router-dom';

export var address 
export default function Home()
{
  // const [currentAccount, setCurrentAccount] = useState("");
  // const contractAddress = "0x0dD19D155ba6bc04106801B05d21FFfCa32521Ea";

  // const contractABI = abi.abi;


  // const checkIfWalletIsConnected = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       console.log("Make sure you have metamask!");
  //       return;
  //     } else {
  //       console.log("We have the ethereum object", ethereum);
  //     }

  //     const accounts = await ethereum.request({ method: 'eth_accounts' });

  //     if (accounts.length !== 0) {
  //       const account = accounts[0];
  //       console.log("Found an authorized account:", account);
  //       setCurrentAccount(account)
  //       address = account;
  //       console.log(address);
  //     } else {
  //       console.log("No authorized account found")
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const connectWallet = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       alert("Get MetaMask!");
  //       return;
  //     }

  //     const accounts = await ethereum.request({ method: "eth_requestAccounts" });

  //     console.log("Connected", accounts[0]);
  //     setCurrentAccount(accounts[0]);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   checkIfWalletIsConnected();
  // }, [])

<<<<<<< HEAD
=======
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
>>>>>>> 05d92cba35db66e654bd190c82fdf97b30b35fdb
  return (
    <div className='Home'> 
     <header className="App-header">
    <span href='/' className='logo'>Zuri.</span>
    <nav>
      <a href="/">Home</a>
<<<<<<< HEAD
      <Button  text="Sign In"  handleClick={connectWallet}></Button>
=======
      {/* {isWalletConnected && <p><span className="font-bold">Your Wallet Address: </span>{customerAddress}</p>} */}
      {/* addressShortner(customerAddress); */}
      {/* <p> <span>{isWalletConnected }{customerAddress}</span></p> */}
      
      
>>>>>>> 05d92cba35db66e654bd190c82fdf97b30b35fdb
    </nav>
  </header>

    <h1>The <span>No. 1 </span> <br/>
    World Class Organization where tech talents are brewed
    </h1>
    <p> Register now to kickstart your career
<<<<<<< HEAD
      </p>
      <Link to="/election"><Button text='Connect your wallet' handleClick={connectWallet}/></Link>
=======
    </p>
   <Button text={isWalletConnected ? "Wallet Connected 🔒" : "Connect Wallet 🔑"} handleClick={checkIfWalletIsConnected} /> 
>>>>>>> 05d92cba35db66e654bd190c82fdf97b30b35fdb
    </div>

  )
}
