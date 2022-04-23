
import Candidate from '../candidate/Candidate'
import './widget.css'
import Control2 from "../../contracts/ShardDAO.json";
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

// const info = [
//   {
//     ID: 0,
//     name: 'Litmus'
//   },
//   {
//     ID: 1,
//     name: 'Litmus2'
//   },

// ]
export default function Widget()
{
  const [contestantName, setcontestantName] = useState([])
  const [contestantAddress, setcontestantAddress] = useState([])
  // var contestantName, contestantAddress
  const contractAddress = "0x6A08244EF41483B197847630709919BE209135A5"
  
   const getAllContestants = async () => {
    try
    {
      const { ethereum } = window;

      if (ethereum)
      {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const shardDAOContract = new ethers.Contract(contractAddress, Control2.abi, signer);

        const voters = await shardDAOContract.getAllContestants();
        // console.log(voters);
        
        setcontestantName(voters[0])
        setcontestantAddress(voters[1])

      

        

        // setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }
 
  useEffect(() => {
   getAllContestants()
  }, [contestantName, contestantAddress])
  
 
  return (
    <div className='widget'>
      <div className='widget-header'>
        <div className='widget-title'>
          <h1>Election</h1>
        </div>

      </div>
      <div className='widget-body'>
      <div className='election-title'>Presidential Vote</div>
              
        { contestantName.map((contestant, index) =>
        
           (
            <div className='candidate-list' key={index}>
              <Candidate contestantName={contestant} contestantID={index} />
            </div>
          )
        )
      }
        
     
   
        </div>
    </div>
  )
}
