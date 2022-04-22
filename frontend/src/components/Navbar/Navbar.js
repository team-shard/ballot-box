import './Navbar.css';
import {ReactComponent as Add} from "../../assets/icons/Add.svg"
import Button from '../button/Button';
import { address } from '../../pages/Home/Home';




// const ans = address.substring(0, 4) + "..." + address.substring(address.length - 4, address.length);
export default function Navbar() {
  return (
    <div className='navbar'>
       <span href='/' className='logo'> Zuri.</span>
      <div className='wrapper'> 
     
        <div className='nav-items'>
          <Button text={address} />
          <a> Create New Election <Add /></a>
          </div>
</div>
    </div>
  )
}
