import './Card.css'
import { ReactComponent as Add } from "../../assets/icons/Add.svg"
import Button from '../button/Button'
import Control2 from "../../contracts/ShardDAO.json";
import { ethers } from 'ethers';
import { useState } from 'react';


export default function Card({ title, subtitle })
{
    const [state, setState] = useState({
        contestantAddress: '',
        contestantName: '',
    });
    const [constantAddress, setConstantAddress] = useState('');
    const [constantName, setConstantName] = useState('');
    const handleChange = (e) =>
    { 
        setState({
            ...state,
            [e.target.name]: e.target.value
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
    const contractAddress = "0x6A08244EF41483B197847630709919BE209135A5"
    const addContestant = async () => {
        try
        {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const shardDAOContract = new ethers.Contract(contractAddress, Control2.abi, signer);
    
              const value = await shardDAOContract.addContestant([contestantName], contestantAddress);
            //   const {contestantName, contestantAddress} = value;
              console.log(value);
            //   setState({
            //       ...state,
            //       [e.target.name]: e.target.value 
            //   })
              
             
           
    
          } else {
            console.log("Ethereum object doesn't exist!")
          }
        } catch (error) {
          console.log(error);
        }
      }
    

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
                  <input type='text' placeholder="Contestant Name" name='contestantName' value={state.contestantName} onChange={ handleChange}/>
                  <input type='text' placeholder="Contestant Address" name='contestantAddress' value={state.contestantAddress} onChange={ handleChange}/>

                  <Button text='Add New' handleClick={addContestant} />
              </div>
              <h5>
                  Name: {state.contestantName}
                  <br />
                  Address: {state.contestantAddress}
              </h5>
        </div>
    </div>
  )
}
