import './Sidebar.css'
import {ReactComponent as Board} from "../../assets/icons/Board.svg"
import {ReactComponent as Election} from "../../assets/icons/Box.svg"
import {ReactComponent as Students} from "../../assets/icons/Students.svg"
import { ReactComponent as Teachers } from "../../assets/icons/Teachers.svg"
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
      <div className='sidebar'>
          <div className='top'>
          <span href='/' className='logo'>Zuri.</span>
          </div>
          <hr/>
          <div className='center'>
        <ul>
          <Link to='/admin/new'>
          <li><Board/> <span>New</span></li>
          </Link>
          <Link to='/admin/result'>
          <li><Teachers/> <span>Result</span></li>
          </Link>
          

                  
                  

          <hr />
          <Link to='/election'>
          <li><Election /> <span>Elections</span></li>
          </Link>
          
              </ul>
          </div>
    </div>
  )
}
