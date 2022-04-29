import Navbar from '../../components/Navbar/Navbar';
import Widget from '../../components/widget/widget';
import './Result.css';
import { Contract } from 'ethers';
import Button from '../../components/button/Button';
import { ethers, utils } from "ethers";
import Shard from "../../contracts/ShardDAO.json";
import React, { useEffect, useState } from "react";


export default function Result() {
const [error, setError] = useState(null);
const[isElectionStarted,setElectionHasStarted] = useState(false);
const[isElectionPaused,setElectionHasPaused] = useState(false);
const[isWalletConnected,setIsWalletConnected] = useState(false);
const [customerAddress, setCustomerAddress] = useState("");


const startElection = async () => {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const shardContract = new ethers.Contract("0xd6c1AdD1B7C7Af82B0d919C39C48A7f008D3B4d7", Shard.abi, signer);
    
      let start = await shardContract.startElection(1000);
      await setElectionHasStarted(true);
      console.log("getuser:",start)
      
    } else {
      console.log("Ethereum object not found, install Metamask.");
      setError("Please install a MetaMask wallet to use our bank.");
    }
  } catch (error) {
    console.log(error);
  }
}

const endElection = async () => {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const shardContract = new ethers.Contract("0x6A08244EF41483B197847630709919BE209135A5", Shard.abi, signer);
    
      let start = await shardContract.endElection();
      await setElectionHasStarted(true);
      console.log("getuser:",start)
      
    } else {
      console.log("Ethereum object not found, install Metamask.");
      setError("Please install a MetaMask wallet to use our bank.");
    }
  } catch (error) {
    console.log(error);
  }
}

const pauseElection = async () => {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log("test pause")
      const shardContract = new ethers.Contract("0x6A08244EF41483B197847630709919BE209135A5", Shard.abi, signer);
    
      let pause = await shardContract.pause();
      await setElectionHasPaused(true);
      console.log("get result:",pause)
      
    } else {
      console.log("Ethereum object not found, install Metamask.");
      setError("Please install a MetaMask wallet to use our bank.");
    }
  } catch (error) {
    console.log(error);
  }
}
const unPauseElection = async () => {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log("test pause")
      const shardContract = new ethers.Contract("0x6A08244EF41483B197847630709919BE209135A5", Shard.abi, signer);
    
      let pause = await shardContract.unpause();
      await setElectionHasPaused(false);
      console.log("get result:",pause)
      
    } else {
      console.log("Ethereum object not found, install Metamask.");
      setError("Please install a MetaMask wallet to use our bank.");
    }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="result">  
      <Navbar />
      <div className="container">
        <h1>Ongoing Election</h1>
        <div className='Body'>
          <div className='election-title'>Governorship Election 
            <div className='button'><Button text= "Pause Election" handleClick = {pauseElection}/> <span> | </span> <Button text="unPause Election" handleClick={unPauseElection} /></div>
            
          </div>
          <div className='button'><Button text="Start Election" handleClick={startElection} /> <span> | </span> <Button text="End Election" handleClick={endElection} /> <span> | </span>  <input
            type='number'
            placeholder="Election Duration in Hours"
            name='contestantName'
            // value={state.duration }
            // onChange={handleChange}
            /> </div>
          </div>
        </div>
      </div>
  )
};