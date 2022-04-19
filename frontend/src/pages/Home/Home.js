import Button from '../../components/button/Button'
import Navbar from '../../components/Navbar/Navbar'
import './Home.css'

export default function Home() {
  return (
    <div className='Home'> 
      <Navbar />

    <h1>The <span>No. 1 </span> <br/>
    World Class Organisation where tech talents are brewed
    </h1>
    <p> Register now to kickstart your career
    </p>
   <Button text='Connect your wallet' handleClick={() => console.log("Clicked")}/>
    </div>

  )
}
