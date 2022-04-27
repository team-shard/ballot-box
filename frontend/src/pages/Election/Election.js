import Navbar from '../../components/Navbar/Navbar'
import Widget from '../../components/widget/widget'
import './Election.css'
import { Contract } from 'ethers';
import Countdown from '../../components/countdown/countdown';




export default function Election() {
  return (
    <div className='Election'>
<Navbar/>
      <div className='container'>
        <Countdown/>
        <Widget />
      </div>
    </div>
  )
}
