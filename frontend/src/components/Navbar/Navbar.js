import './Navbar.css';
import {ReactComponent as Add} from "../../assets/icons/Add.svg"
import Button from '../button/Button';
import { address } from '../../pages/Home/Home';
import addressShortner from '../../utils/addressShortner';
import React, { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import Shard from "../../contracts/ShardDAO.json";



// const ans = address.substring(0, 4) + "..." + address.substring(address.length - 4, address.length);
export default function Navbar() {
  const[isWalletConnected,setIsWalletConnected] = useState(false);
  const [customerAddress, setCustomerAddress] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  
  
  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
       await setIsWalletConnected(true);
        setCustomerAddress(account);
        console.log("Account Connected: ", account);
      //  getUserRole().then((data) => {
      //   console.log("user:",data.role)
      //   console.log("isAdmin :",data.isAdmin)
       
      //  })
      
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
        const shardContract = new ethers.Contract("0xd6c1AdD1B7C7Af82B0d919C39C48A7f008D3B4d7", Shard.abi, signer);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log("account :",account)
        
        let role = await shardContract.getUserRole(account);
        console.log("getuser:",role)
        setUser(role);
        
        
        console.log("userRole",role);
       
    
        
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    getUserRole();
  }, [isWalletConnected],[user])
  return (
    <div className='navbar'>
       <span href='/' className='logo'> Zuri.</span>
      <div className='wrapper'> 
     
        <div className='nav-items'>
        <span  text='logo'> {user}</span>
          <Button text= {addressShortner(customerAddress)} />
          {/* <a> Create New Election <Add /></a> */}
          </div>
</div>
    </div>
  )
}
