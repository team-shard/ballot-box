import Button from '../button/Button'
import './Candidate.css'
import {Contract} from 'ethers';


export default function Candidate()
{
  return (
      <div className='candidate'>

          <div className='candidate-card'>
              <div className='card-header'>
                  </div>
          <div className='card-info'>
          <div className='id'>ID: 1234</div>
                  <Button text='Vote' />
            </div>
          </div>
    </div>
  )
}
