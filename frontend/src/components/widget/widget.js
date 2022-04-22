
import Candidate from '../candidate/Candidate'
import './widget.css'
import Control2 from "../../contracts/ShardDAO.json";
import { ethers } from 'ethers';

export default function Widget() {
  return (
    <div className='widget'>
      <div className='widget-header'>
        <div className='widget-title'>
          <h1>Election</h1>
        </div>

      </div>
      <div className='widget-body'>
      <div className='election-title'>Presidential Vote</div>
        <div className='candidate-list'>
          
        <Candidate />
      
        </div>
        </div>
      
    </div>
  )
}
