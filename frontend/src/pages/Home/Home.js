import Button from '../../components/button/Button'
import './Home.css'
import {Contract} from 'ethers';

export default function Home() {
  return (
    <div className='Home'> 
     <header className="App-header">
    <span href='/' className='logo'>Zuri.</span>
    <nav>
      <a href="/">Home</a>
      <Button  text="Sign In"  handleClick={()=> console.log("clicked")}></Button>
      {/* <Button  text="Enroll"  handleClick={()=> console.log("clicked")}></Button> */}
    </nav>
  </header>

    <h1>The <span>No. 1 </span> <br/>
    World Class Organisation where tech talents are brewed
    </h1>
    <p> Register now to kickstart your career
    </p>
   <Button text='Connect your wallet' handleClick={() => console.log("Clicked")}/>
    </div>

  )
}
