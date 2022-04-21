import Navbar from '../../components/Navbar/Navbar';
import Widget from '../../components/widget/widget';
import './Result.css';
import { Contract } from 'ethers';
import Button from '../../components/button/Button';




export default function Result() {
  return (
    <div className="result">
      <Navbar />
      <div className="container">
        <h1>Ongoing Election</h1>
        <div className='Body'>
          <div className='election-title'>Governorship Election 
            <div className='button'><Button text='Stop Election' /> <span> | </span> <Button text='Start Election' /></div>
            
          </div>

</div>
        s``
       
        </div>

    </div>
  )
}
;