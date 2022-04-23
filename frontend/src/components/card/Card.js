import './Card.css'
import { ReactComponent as Add } from "../../assets/icons/Add.svg"
import Button from '../button/Button'
import { ethers } from 'ethers';
import { useState } from 'react';
import Shard from "../../contracts/ShardDAO.json";


export default function Card({ title, subtitle })
{
    const [error, setError] = useState(null);
    const [listNames, setList] = useState("");
    const [listAddress, setListAddress] = useState();
    // const [inputValue, setInputValue] = useState({ walletAddress: "", contestantName: '',});
    const [state, setState] = useState({contestantName: "",contestantAddress: ""});
    const handleChange = (e) =>
    { 
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        setList({
          ...listNames,
          [e.target.name]: e.target.value
      })
      setListAddress({
        ...listAddress,
        [e.target.account]: e.target.value
    })
    }
    // async () => {
    //     await methods
    //       .grantRole(
    //         "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42",
    //         address
    //       )
    //       .then(() => {
    //         setOpen(true);
    //         setTimeout(() => {
    //           setOpen(false);
    //         }, 1500);
    //       })
    //       .catch(() => {
    //         setOpen2(true);
    //         setTimeout(() => {
    //           setOpen2(false);
    //         }, 1500);
    //       });
    //   }}
    const contractAddress = "0xd6c1AdD1B7C7Af82B0d919C39C48A7f008D3B4d7"
    const addContestant = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          console.log("test add")
          const shardContract = new ethers.Contract(contractAddress, Shard.abi, signer);
          console.log("details :",listNames,listAddress)
          console.log("detailing:",state.contestantAddress,state.contestantName)
      
          const add = await shardContract.addContestant([state.contestantName],[state.contestantAddress])
          console.log( "get result:",add)
          
        } else {
          console.log("Ethereum object not found, install Metamask.");
          setError("Please install a MetaMask wallet to use our bank.");
        }
      } catch (error) {
        console.log(error);
      }
    }
    // const addContestant = async () => {
    //     try
    //     {
    //       const { ethereum } = window;
    
    //       if (ethereum) {
    //         const provider = new ethers.providers.Web3Provider(ethereum);
    //         const signer = provider.getSigner();
    //         const shardDAOContract = new ethers.Contract(contractAddress, Control2.abi, signer);
    
    //           const value = await shardDAOContract.addContestant("contestantName", "contestantAddress");
    //         //   const {contestantName, contestantAddress} = value;
    //           console.log(value);
    //         //   setState({
    //         //       ...state,
    //         //       [e.target.name]: e.target.value 
    //         //   })
              
             
    //         // votersCleaned = voters.forEach(voter => {
    //         //   votersCleaned.push({
    //         //     contestantID: voter.contestantAddress,
    //         //     contestantName: voter.contestantName,
    //         //     voteCount: voter.voteCount,
    //         //     timestamp: new Date(voter.timestamp * 1000),
               
    //         //   });
        
    
    //         // setAllWaves(wavesCleaned);
    //       } else {
    //         console.log("Ethereum object doesn't exist!")
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    

  return (
      <div className='card'>
          <div className='card-body'>
              <div className='card-title'>
                  { title}
              </div>
              <div className='card-subtitle'>
                  {subtitle}
              </div>
              
              <div className='card-content'>
                  <input type='text' placeholder="Contestant Name" name='contestantName' value={state.contestantName} onChange={handleChange} />
                  <input type='text' placeholder="Contestant Address" name='contestantAddress' value={state.contestantAddress} onChange={handleChange} />

                  <Button text='Add New' handleClick={addContestant} />
              </div>
              {/* <h5>
                  Name: {state.contestantName}
                  <br />
                  Address: {state.contestantAddress}
              </h5> */}
        </div>
    </div>
  )
}
