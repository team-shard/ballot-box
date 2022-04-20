import './Card.css'
import { ReactComponent as Add } from "../../assets/icons/Add.svg"
import Button from '../button/Button'


export default function Card({title, subtitle}) {
  return (
      <div className='card'>
          <div className='card-body'>
              <div className='card-title'>
                  { title}
              </div>
              <div className='card-subtitle'>
                  {subtitle}
              </div>
              
              <div className='card-content'>
                  <input  type='text' placeholder="Wallet Address"/>
                  <Button text='Add New'/>
              </div>
        </div>
    </div>
  )
}
