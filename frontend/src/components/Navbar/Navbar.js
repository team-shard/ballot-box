import './Navbar.css';
import {ReactComponent as Add} from "../../assets/icons/Add.svg"
import Button from '../button/Button';

const address = "0xeC1EB96389782511B7AE9409DF49eac1B2f3754e"
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
