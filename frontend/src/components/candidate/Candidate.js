import Button from '../button/Button'
import './Candidate.css'
import { ethers } from 'ethers';
import Control from "../../contracts/AccessControl.json";
import Control2 from "../../contracts/ShardDAO.json";


export default function Candidate()
{
  const contractAddress = "0x6A08244EF41483B197847630709919BE209135A5"

  var contestantID;
  const getAllContestants = async () => {
    try
    {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const shardDAOContract = new ethers.Contract(contractAddress, Control2.abi, signer);

        const voters = await shardDAOContract.getAllContestants();
        console.log(voters);
        let votersCleaned=[];
        votersCleaned = voters.forEach(voter => {
          votersCleaned.push({
            contestantID: voter.contestantAddress,
            contestantName: voter.contestantName,
            voteCount: voter.voteCount,
            timestamp: new Date(voter.timestamp * 1000),
           
          });
        });

        // setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }
console.log();

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
          <div className='id'>ID: 1234</div>
                  <Button text='Vote' handleClick={vote} />
            </div>
          </div>
    </div>
  )
}
