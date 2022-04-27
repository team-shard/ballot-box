import Button from '../../components/button/Button'
import './Home.css'
import {Contract} from 'ethers';

import React, { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import { useNavigate } from 'react-router';
import Control from "../../contracts/AccessControl.json";
import Chairman from '../Admin/Chairman';
import Shard from "../../contracts/ShardDAO.json";
import { Link } from 'react-router-dom';
export  var  address;

export default function Home() {
  const[isWalletConnected,setIsWalletConnected] = useState(false);
  const [customerAddress, setCustomerAddress] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  const [user, setUser] = useState("tgif");
  let navigate = useNavigate();
  

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
       await setIsWalletConnected(true);
        setCustomerAddress(account);
        console.log("Account Connected: ", account);
       getUserRole().then((data) => {
        console.log("user:",data.role)
        console.log("isAdmin :",data.isAdmin)
        if(data.role === "not registered"){
          navigate("/result",{replace:true})
        }
        else {data.isAdmin ? navigate("/admin/name",{replace:true}):navigate("/election",{replace:true})}
       })
      
      } 
      else {
        setError("Please install a MetaMask wallet to use our App");
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
        const shardContract = new ethers.Contract("0x6A08244EF41483B197847630709919BE209135A5", Shard.abi, signer);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log("account :",account)
        
        let role = await shardContract.getUserRole(account);
        console.log("getuser:",role)
        setUser(role);
        var isAdmin;
        if(role === "Chairman"||"Board"||"Teachers"){setAdmin(true); isAdmin = true};
        console.log("userRole",role);
        return {role,isAdmin};
    
        
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  

  
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
      <Link to='/election'>
      <Button text={isWalletConnected ? "Wallet Connected 🔒" : "Connect Wallet 🔑"} handleClick={checkIfWalletIsConnected} /> 
      </Link>
  
    </div>

  )
}