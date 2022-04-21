import Navbar from '../../components/Navbar/Navbar'
import Widget from '../../components/widget/widget'
import './Election.css'
import {Contract} from 'ethers';


export default function Election() {
  return (
    <div className='Election'>
<Navbar/>
      <div className='container'>
        <Widget />
      </div>
    </div>
  )
}
