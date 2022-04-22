import Button from '../button/Button'
import './Candidate.css'
import { ethers } from 'ethers';
import Control2 from "../../contracts/ShardDAO.json";


export default function Candidate()
{
  const vote = async () =>
  { 
    
  } 
  return (
      <div className='candidate'>

          <div className='candidate-card'>
              <div className='card-header'>
                  </div>
          <div className='card-info'>
          <div className='id'>ID: 1234</div>
                  <Button text='Vote' handleClick={null} />
            </div>
          </div>
    </div>
  )
}
