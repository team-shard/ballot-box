import './Navbar.css';
import {ReactComponent as Add} from "../../assets/icons/Add.svg"
import Button from '../button/Button';
import { address } from '../../pages/Home/Home';

const ans = `${address.slice(0,3)}${"...."}${address.slice(-4)}`
console.log(ans)
export default function Navbar() {
  return (
    <div className='navbar'>
       <span href='/' className='logo'>Zuri.</span>
      <div className='wrapper'> 
     
        <div className='nav-items'>
          <Button text={ans} />
          <a> Create New Election <Add /></a>
          </div>
</div>
    </div>
  )
}
