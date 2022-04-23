import Button from '../button/Button'
import './Candidate.css'
import { ethers } from 'ethers';
import Control from "../../contracts/AccessControl.json";
import Control2 from "../../contracts/ShardDAO.json";
import { useState } from 'react';


export default function Candidate({contestantName, contestantID})
{
  const contractAddress = "0x6A08244EF41483B197847630709919BE209135A5"
 const [voted,setVoted] = useState(false)


  const vote = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const shardDAOContract = new ethers.Contract(contractAddress, Control2.abi, signer);

        let count = await shardDAOContract.getTotalVoteCount();
        console.log("Retrieved total vote count...", count.toNumber());

        const voteTxn = await shardDAOContract.vote(contestantID);
        setVoted(true)
        console.log("Mining...", voteTxn.hash);

        await voteTxn.wait();
        console.log("Mined -- ", voteTxn.hash);

        count = await shardDAOContract.getTotalVoteCount();
        console.log("Retrieved total vote count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
      <div className='candidate'>

          <div className='candidate-card'>
              <div className='card-header'>
                  </div>
          <div className='card-info'>
          <div className='id'>{ contestantID}</div>
          <div className='id'>{ contestantName}</div>
                  <Button text='Vote' handleClick={vote} />
            </div>
          </div>
    </div>
  )
}
