import './Sidebar.css'
import {ReactComponent as Board} from "../../assets/icons/Board.svg"
import {ReactComponent as Election} from "../../assets/icons/Box.svg"
import {ReactComponent as Students} from "../../assets/icons/Students.svg"
import {ReactComponent as Teachers} from "../../assets/icons/Teachers.svg"

export default function Sidebar() {
  return (
      <div className='sidebar'>
          <div className='top'>
          <span href='/' className='logo'>Zuri.</span>
          </div>
          <hr/>
          <div className='center'>
              <ul>
                  <li><Board/> <span>Board</span></li>
                  <li><Teachers/> <span>Teachers</span></li>
                  <li><Students /> <span>Students</span></li>
          <hr />
          <li><Election /> <span>Elections</span></li>
              </ul>
          </div>
    </div>
  )
}
